package com.idealfed.forms;

import com.atlassian.connect.spring.AtlassianHostUser;
import com.atlassian.connect.spring.AtlassianHost;
import com.atlassian.connect.spring.AtlassianHostRestClients;

import com.atlassian.connect.spring.ContextJwt;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.idealfed.forms.model.CustomType;
import com.idealfed.forms.model.Form;
import com.idealfed.forms.model.FormSet;
import com.idealfed.forms.model.Snippet;
import com.idealfed.forms.repositories.CustomTypeRepository;
import com.idealfed.forms.repositories.FormRepository;
import com.idealfed.forms.repositories.FormsetRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.thymeleaf.context.WebContext;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.Optional;

@Controller
public class IframeController {
    private static final Logger log = LoggerFactory.getLogger(DataController.class);

    private static final String gRoot = AddonApplication.appRoot;
    private static final String gProductName = AddonApplication.productName;

    private static String applicationKey = AddonApplication.addonKey;

    @Autowired
    ServletContext servletContext;
    @Autowired
    private FormsetRepository formsetRepository;
    @Autowired
    private FormRepository formRepository;
    @Autowired
    private CustomTypeRepository customTypeRepository;
    @Autowired
    private AtlassianHostRestClients atlassianHostRestClients;


    @RequestMapping(value = "/iframe", method = RequestMethod.GET)
    public String getIframe(@AuthenticationPrincipal AtlassianHostUser hostUser, HttpServletRequest request, HttpServletResponse response, Model model) {
        model.addAttribute("ijfRoot",gRoot);
        return "/adminIframe";
    }  //adminIframe

    @ContextJwt
    @RequestMapping(value = "/splash", method = RequestMethod.GET)
    public String getSplashTemplate(@AuthenticationPrincipal AtlassianHostUser hostUser, HttpServletRequest request, HttpServletResponse response, Model model) {

        model.addAttribute("ijfRoot",gRoot);
        return "/splash";
    }


    @RequestMapping(value = "/productadmin", method = RequestMethod.GET)
    public String getProductAdminTemplate(@AuthenticationPrincipal AtlassianHostUser hostUser, HttpServletRequest request, HttpServletResponse response, Model model) //(HttpServletRequest request, HttpServletResponse response)
    {
        log.debug("Working produuct admin template");

        Map<String, String[]> parameters = request.getParameterMap();
        String debug = "";
        if(parameters.containsKey("debug")) debug = request.getParameter("debug");
        String craft = "";
        if(parameters.containsKey("craft")) craft = request.getParameter("craft");
        String remote = "";
        if(parameters.containsKey("remote")) remote = request.getParameter("remote");
        //Begin license
        String urlLicense = "";
        if(parameters.containsKey("lic")) urlLicense = request.getParameter("lic");
        log.debug("URL License is: " + urlLicense);

        //look for request params...populate the context model
        model.addAttribute("test","Hello from Thyme");
        model.addAttribute("pathRoot",gRoot);
        model.addAttribute("ijfHtmlReferences","<!-- Html refs -->");
        model.addAttribute("ijfSnippetPub","");
        model.addAttribute("ijfStyle","");
        Optional<String> userId = hostUser.getUserAccountId();
        model.addAttribute("ijfUsername",userId.get());
        model.addAttribute("ijfVersion","");
        model.addAttribute("firstFormSet","");
        model.addAttribute("ijfFormId","");
        model.addAttribute("ijfItemId","");
        model.addAttribute("ijfDebug",debug);
        model.addAttribute("ijfRoot",gRoot);
        model.addAttribute("ijfCraft",craft);
        model.addAttribute("ijfProduct",gProductName);
        model.addAttribute("ijfLicense",urlLicense);

        log.debug("returning product admin template");
        return "/productadmin";
    }

    @ContextJwt
    @RequestMapping(value = "/admin", method = RequestMethod.GET)
    public String getAdminTemplate(@AuthenticationPrincipal AtlassianHostUser hostUser, HttpServletRequest request, HttpServletResponse response, Model model) //(HttpServletRequest request, HttpServletResponse response)
    {
        log.debug("Working admin template");

        Map<String, String[]> parameters = request.getParameterMap();
        String debug = "";
        if(parameters.containsKey("debug")) debug = request.getParameter("debug");
        String craft = "";
        if(parameters.containsKey("craft")) craft = request.getParameter("craft");
        String remote = "";
        if(parameters.containsKey("remote")) remote = request.getParameter("remote");
        //Begin license
        String urlLicense = "";
        if(parameters.containsKey("lic")) urlLicense = request.getParameter("lic");
        log.debug("URL License is: " + urlLicense);

        //look for request params...populate the context model
        model.addAttribute("test","Hello from Thyme");
        model.addAttribute("pathRoot",gRoot);
        model.addAttribute("ijfHtmlReferences","<!-- Html refs -->");
        model.addAttribute("ijfSnippetPub","");
        model.addAttribute("ijfStyle","");
        Optional<String> userId = hostUser.getUserAccountId();
        model.addAttribute("ijfUsername",userId.get());
        model.addAttribute("ijfVersion","");
        model.addAttribute("firstFormSet","");
        model.addAttribute("ijfFormId","");
        model.addAttribute("ijfItemId","");
        model.addAttribute("ijfDebug",debug);
        model.addAttribute("ijfRoot",gRoot);
        model.addAttribute("ijfCraft",craft);
        model.addAttribute("ijfLicense",urlLicense);
        return "/admin";
    }

    @RequestMapping(value = "/runFrame", method = RequestMethod.GET)
    public String getRuntimeTemplateInFrame(@AuthenticationPrincipal AtlassianHostUser hostUser, HttpServletRequest request, HttpServletResponse response, Model model) //(HttpServletRequest request, HttpServletResponse response)
    {
        return getRuntimeTemplate(hostUser, request, response, model);
    }

    @ContextJwt
    @RequestMapping(value = "/run", method = RequestMethod.GET)
    public String getRuntimeTemplate(@AuthenticationPrincipal AtlassianHostUser hostUser, HttpServletRequest request, HttpServletResponse response, Model model) //(HttpServletRequest request, HttpServletResponse response)
    {
//var tUrl = g_root + '/run?debug=true&craft=true&itemId='+thisF.testIssue+'&formId='+thisF.name;
        Map<String, String[]> parameters = request.getParameterMap();
        String debug = "";
        if(parameters.containsKey("debug")) debug = request.getParameter("debug");
        String craft = "";
        if(parameters.containsKey("craft")) craft = request.getParameter("craft");
        String itemId = "";
        if(parameters.containsKey("itemId")) itemId = request.getParameter("itemId");
        String formId = "";
        if(parameters.containsKey("formId")) formId = request.getParameter("formId");


        //Begin license
        String urlLicense = "";
        if(parameters.containsKey("lic")) urlLicense = request.getParameter("lic");
        log.debug("URL License is: " + urlLicense);
        //get license....
        //String upmLicense = this.getLicenseInfo();
        //end licenes

        String snippets = "";
        String styles = "";
        String snippetPub = "";
        String vInj = "";

        //updating to allow formId to be numeric


        if((!formId.equals("")) && (craft.equals("")))
        {
            //primary runtime ...
            FormSet fs = null;

            int tempFormId =0;
            try {
                log.debug("Getting FormSet using Form Id: " + formId);
                tempFormId = new Integer(formId).intValue();
                Form f = formRepository.findById(tempFormId);
                log.debug("Form constructed: " + f);
                fs = f.getFormSet();
            }
            catch(Exception e)
            {
                String clientId = hostUser.getHost().getClientKey();
                log.debug("Getting FormSet using Form by Name: " + formId);
                tempFormId=0;
                //need to rip through Forms for customer and get the one formId
                for (FormSet thisFs : formsetRepository.findAllByCustomerKeyOrderByIdDesc(clientId)) {
                    for (Form f : formRepository.findByFormSet(thisFs)) {
                        if(f.getName().equals(formId)) fs = thisFs;
                        //result is if there are forms of same name, last one wins...
                    }
                }
            }

            if(fs != null)
            {
                try
                {
                    JsonParser jsonParser = new JsonParser();
                    vInj = getVelocityInjections(jsonParser, hostUser);
                    JsonObject sObject;
                    StringBuilder snips = new StringBuilder();
                    StringBuilder styls = new StringBuilder();
                    StringBuilder sOut = new StringBuilder();
                    for (Snippet s : fs.getSnippets())
                    {
                        if(s.getName().equals("style"))
                        {
                            String outStyle = "{\"snippet\":" + new String(s.getSnippet(), StandardCharsets.UTF_8) + "}";
                            sObject = (JsonObject) jsonParser.parse(outStyle);
                            outStyle = sObject.get("snippet").getAsString();
                            outStyle=outStyle.replace("~pct~", "%");
                            styls.append(outStyle);
                        }
                        else
                        {
                            sOut.append("," + s.getName() + ":" + s.getName());
                            String outSnip = "{\"snippet\":" + new String(s.getSnippet(), StandardCharsets.UTF_8) + "}";
                            sObject = (JsonObject) jsonParser.parse(outSnip);
                            outSnip = sObject.get("snippet").getAsString();
                            outSnip=outSnip.replace("~pct~", "%");
                            snips.append("\n");
                            snips.append(outSnip);
                        }
                    }
                    snippets = snips.toString();
                    styles = styls.toString();
                    snippetPub = sOut.toString();
                }
                catch(Exception e)
                {
                    snippets = "Failed to gen snippets: " + e.getMessage();
                    styles = "";
                    snippetPub = "";
                    vInj="";
                    log.error("Failed to package snippets ", e);
                }
            }
        }

        //load html ref...

        //look for request params...populate the context model
        model.addAttribute("pathRoot",gRoot);
        model.addAttribute("ijfHtmlReferences",vInj);
        model.addAttribute("ijfSnippetPub",snippetPub);
        model.addAttribute("ijfScript",snippets);
        model.addAttribute("ijfStyle",styles);
        Optional<String> userId = hostUser.getUserAccountId();
        model.addAttribute("ijfUsername",userId.get());
        model.addAttribute("ijfVersion","");
        model.addAttribute("firstFormSet","");
        model.addAttribute("ijfFormId",formId);
        model.addAttribute("ijfItemId",itemId);
        model.addAttribute("ijfDebug",debug);
        model.addAttribute("ijfRoot",gRoot);
        model.addAttribute("ijfCraft",craft);
        model.addAttribute("ijfProduct",gProductName);
        model.addAttribute("ijfLicense",urlLicense);
        return "/runtime";
    }
    private String getVelocityInjections(JsonParser jsonParser, AtlassianHostUser hostUser)
    {
        try
        {
            //lookup custom type, verify URL is in the list....
            CustomType ct = null;
            String retStr = "";
            String clientId = hostUser.getHost().getClientKey();
            for (CustomType t : customTypeRepository.findAllByCustomerKeyOrderByIdDesc(clientId))
            {
                if(t.getName().equals("HTML References")) ct = t;
            }
            if(ct==null)
            {
                return "";
            }
            String proxyList = new String(ct.getSettings(), StandardCharsets.UTF_8);
            String tempRefs = "{\"references\":" + proxyList + "}";
            JsonObject sObject;
            sObject = (JsonObject) jsonParser.parse(tempRefs);
            String refs = sObject.get("references").getAsString();
            refs=refs.substring(1,refs.length()-1);
            String refLines[] = refs.split("\\\\n");
            for(int i=0;i<refLines.length;i++)
            {
                //plog.error("Testing URL: " + okUrls[i]);
                retStr += refLines[i].replaceAll("\\\\\\\"","\"") + "\n";
            }
            return retStr;
        }
        catch(Exception e)
        {
            log.error("Error getting Proxy Whitelist",e);
            return "";
        }
    }

    private String getLicenseInfo()
    {
        //"Api get license info: /rest/atlassian-connect/1/addons/{appKey}"

        log.debug("Calling get license for: " + applicationKey);

        String json = atlassianHostRestClients
                .authenticatedAsHostActor()
                .getForObject("/rest/atlassian-connect/1/addons/"+applicationKey, String.class);

        log.debug("Lic Results: " + json);

        return json;
    }
}