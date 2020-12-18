package com.idealfed.forms;

import com.atlassian.connect.spring.AtlassianHost;
import com.atlassian.connect.spring.AtlassianHostRestClients;
import com.atlassian.connect.spring.AtlassianHostUser;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.idealfed.forms.model.Form;
import com.idealfed.forms.model.FormSet;

import com.idealfed.forms.model.Snippet;
import com.idealfed.forms.model.Version;
import com.idealfed.forms.repositories.*;
import liquibase.pro.packaged.J;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.Date;
import java.util.Map;
import java.util.Optional;


import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;
import static org.springframework.web.bind.annotation.RequestMethod.PUT;
import static org.springframework.web.bind.annotation.RequestMethod.DELETE;


@RestController
public class DataController {
    private static final Logger log = LoggerFactory.getLogger(DataController.class);

    @Autowired
    private AtlassianHostRestClients atlassianHostRestClients;

    @Autowired
    private FormsetRepository formsetRepository;
    @Autowired
    private CustomTypeRepository customTypeRepository;
    @Autowired
    private FormRepository formRepository;
    @Autowired
    private VersionRepository versionRepository;
    @Autowired
    private SnippetRepository snippetRepository;


    @RequestMapping(value = "/configxxxxxx", method = GET) //, produces = "application/json")
    @ResponseBody
    public String getConfig(@AuthenticationPrincipal AtlassianHostUser hostUser, HttpServletRequest request,
                            HttpServletResponse response) {

        log.debug("Getting configuration");

        JsonObject jout = new JsonObject();
        jout.addProperty("status","tbd");
        jout.addProperty("message","tbd");
        jout.addProperty("resultSet","tbd");

        try
        {
            Map<String, String[]> parameters = request.getParameterMap();
            String paramVersion = "0";
            if(parameters.containsKey("version")) paramVersion = request.getParameter("version");

            StringBuilder sb = new StringBuilder("{\"status\":\"OK\",\"resultSet\":[");

            int rCnt = 0;
            for (FormSet fs : formsetRepository.findAll()) {
                sb.append(FormUtils.getAoFormSetJson(fs));
            }
            sb.append("{}],\"customTypes\":[");
            for (com.idealfed.forms.model.CustomType ct : customTypeRepository.findAll())
            {
                sb.append(FormUtils.getCustomTypeJson(ct));
            }
            sb.append("{}]}");

            log.debug("Sending configuration Done");

            return sb.toString();
        }
        catch(Exception e)
        {
            log.error("Error gettting config",e);
            jout.addProperty("status","error");
            jout.addProperty("message","Failed to get configuration");
            jout.addProperty("resultSet",e.getMessage());
            return jout.toString();
        }

    }

    @RequestMapping(value = "/rest/**", method = GET, produces = "application/json")
    public String runJiraApiCall(@AuthenticationPrincipal AtlassianHostUser hostUser, HttpServletRequest request,
                HttpServletResponse response) {
        log.debug("\nRunning put api call...");
        JsonObject jout = new JsonObject();
        jout.addProperty("status","tbd");
        jout.addProperty("message","tbd");
        jout.addProperty("resultSet","");
        try
        {
            log.debug("Running get api call...");
            String queryString =   request.getQueryString();
            String apiString = request.getRequestURI();
            if(queryString!=null) apiString += "?" + queryString;

            log.debug("Api get  call: " + apiString);
            String json = atlassianHostRestClients
                    .authenticatedAsHostActor()
                    .getForObject(apiString, String.class);

            log.debug("Results from api call: " + json);

            return json;
        }
        catch(Exception e)
        {
            jout.addProperty("status","error");
            jout.addProperty("message","Failed running api get");
            jout.addProperty("resultSet",e.getMessage());
        }
        return jout.toString();
    }

    @RequestMapping(value = "/rest/**", method = PUT, produces = "application/json")
    public String runJiraPutApiCall(@AuthenticationPrincipal AtlassianHostUser hostUser, HttpServletRequest request,
                                 HttpServletResponse response) {

        log.debug("Running put api call...");
        JsonObject jout = new JsonObject();
        jout.addProperty("status","tbd");
        jout.addProperty("message","tbd");
        jout.addProperty("resultSet","");
        try
        {
            //need to parse the inbound target and pass on just the path....
            //todo:  run as plugin if caller is admin, run as user if not....

            String queryString =   request.getQueryString();
            String apiString = request.getRequestURI();
            if(queryString!=null) apiString += "?" + queryString;
            log.debug("Api call: " + apiString);

            //inbound data
            String json = FormUtils.getBody(request);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            AtlassianHost host = hostUser.getHost();
            HttpEntity<String> entity = new HttpEntity<String>(json, headers);

            UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(host.getBaseUrl() + apiString);

            RestTemplate restTemplate = atlassianHostRestClients.authenticatedAsHostActor();

            restTemplate.put(builder.toUriString(), entity);

            //atlassianHostRestClients.authenticatedAsAddon().getForObject(builder.toUriString(), String.class);
            //String responsetemp = jResponse.getBody();

            //atlassianHostRestClients
            //        .authenticatedAsHostActor()
            //        .put(apiString, request, String.class);

            log.debug("Just ran put api call...");
            jout.addProperty("status","success");
            jout.addProperty("message","put ran");
        }
        catch(Exception e)
        {
            jout.addProperty("status","error");
            jout.addProperty("message","Failed running api put");
            jout.addProperty("resultSet",e.getMessage());
        }

        return jout.toString();
    }
    @RequestMapping(value = "/rest/**", method = POST, produces = "application/json")
    public String runJiraPostApiCall(@AuthenticationPrincipal AtlassianHostUser hostUser, HttpServletRequest request,
                                    HttpServletResponse response) {

        log.debug("\nRunning post api call...");
        JsonObject jout = new JsonObject();
        jout.addProperty("status","tbd");
        jout.addProperty("message","tbd");
        jout.addProperty("resultSet","");
        try
        {
            //need to parse the inbound target and pass on just the path....
            //todo:  run as plugin if caller is admin, run as user if not....

            String queryString =   request.getQueryString();
            String apiString = request.getRequestURI();
            if(queryString!=null) apiString += "?" + queryString;
            log.debug("POST Api call: " + apiString);
            //inbound data
            String json = FormUtils.getBody(request);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            AtlassianHost host = hostUser.getHost();
            HttpEntity<String> entity = new HttpEntity<String>(json, headers);

            UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(host.getBaseUrl() + apiString);
            RestTemplate restTemplate = atlassianHostRestClients.authenticatedAsHostActor();
            ResponseEntity<String> jResponse = restTemplate.postForEntity(builder.toUriString(), entity, String.class);

            log.debug("Results from POST api call: " + json);
            return jResponse.toString();
        }
        catch(Exception e)
        {
            jout.addProperty("status","error");
            jout.addProperty("message","Failed running api post");
            jout.addProperty("resultSet",e.getMessage());
            return jout.toString();
        }


    }
    @RequestMapping(value = "/rest/**", method = DELETE, produces = "application/json")
    public String runJiraDeleteApiCall(@AuthenticationPrincipal AtlassianHostUser hostUser, HttpServletRequest request,
                                    HttpServletResponse response) {
        JsonObject jout = new JsonObject();
        jout.addProperty("status","tbd");
        jout.addProperty("message","tbd");
        jout.addProperty("resultSet","tbd");
        try
        {
            log.debug("Running delete api call...");

            String queryString =   request.getQueryString();
            String apiString = request.getRequestURI();
            if(queryString!=null) apiString += "?" + queryString;

            log.debug("Delete Api call: " + apiString);
            //inbound data
            String json = FormUtils.getBody(request);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            AtlassianHost host = hostUser.getHost();
            HttpEntity<String> entity = new HttpEntity<String>(json, headers);

            UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(host.getBaseUrl() + apiString);

            RestTemplate restTemplate = atlassianHostRestClients.authenticatedAsHostActor();

            restTemplate.put(builder.toUriString(), entity);


            jout.addProperty("status","success");
            jout.addProperty("message","delete ran");
        }
        catch(Exception e)
        {
            jout.addProperty("status","error");
            jout.addProperty("message","Failed running api delete");
            jout.addProperty("resultSet",e.getMessage());
        }

        return jout.toString();
    }

    @RequestMapping(value = "/plugins/servlet/iforms", method = GET) //, produces = "application/json")
    public String runFormsGetApiCall(@AuthenticationPrincipal AtlassianHostUser hostUser, HttpServletRequest request,
                                  HttpServletResponse response) {
        JsonObject jout = new JsonObject();
        jout.addProperty("status","tbd");
        jout.addProperty("message","tbd");
        jout.addProperty("resultSet","tbd");
        String iwfAction = "";
        try
        {
            Map<String, String[]> parameters = request.getParameterMap();
            if(parameters.containsKey("ijfAction")) iwfAction = request.getParameter("ijfAction");
            log.debug("Running forms api GET call action: " + iwfAction);

            if(iwfAction.equals("getConfig")) {
                String paramVersion = "0";
                if(parameters.containsKey("version")) paramVersion = request.getParameter("version");

                StringBuilder sb = new StringBuilder("{\"status\":\"OK\",\"resultSet\":[");

                int rCnt = 0;
                for (FormSet fs : formsetRepository.findAll()) {
                    sb.append(FormUtils.getAoFormSetJson(fs));
                }
                sb.append("{}],\"customTypes\":[");
                for (com.idealfed.forms.model.CustomType ct : customTypeRepository.findAll())
                {
                    sb.append(FormUtils.getCustomTypeJson(ct));
                }
                sb.append("{}]}");

                log.debug("Sending configuration Done");
                return sb.toString();
            }
            if(iwfAction.equals("getFormConfig")) {
                String formName = "tbd";
                if(parameters.containsKey("formId")) formName = request.getParameter("formId");

                FormSet fs = null;
                int rCnt = 0;
                for (Form f : formRepository.findAll()) {
                    if(f.getName().equals(formName)) fs = f.getFormSet();
                }
                StringBuilder sb = new StringBuilder("{\"status\":\"OK\",\"resultSet\":[");
                if(fs!=null) sb.append(FormUtils.getAoFormSetJson(fs));
                sb.append("{}],\"customTypes\":[");
                for (com.idealfed.forms.model.CustomType ct : customTypeRepository.findAll())
                {
                    sb.append(FormUtils.getCustomTypeConfig(ct));
                }
                sb.append("{}]}");

                log.debug("Sending configuration Done");
                return sb.toString();
            }
            else
            {
                log.error("Invalid action requested: " + iwfAction);
                jout.addProperty("status","error");
                jout.addProperty("message","");
            }
        }
        catch(Exception e)
        {
            log.error("Error running forms api for action: " + iwfAction,e);
            jout.addProperty("status","error");
            jout.addProperty("message","Failed to run api call");
            jout.addProperty("resultSet",e.getMessage());
        }
        return jout.toString();
    }

    @RequestMapping(value = "/plugins/servlet/iforms", method = POST) //, produces = "application/json")
    public String runFormsPostApiCall(@AuthenticationPrincipal AtlassianHostUser hostUser, HttpServletRequest request,
                                 HttpServletResponse response) {

        JsonObject jout = new JsonObject();
        jout.addProperty("status","tbd");
        jout.addProperty("message","tbd");
        jout.addProperty("resultSet","tbd");
        String iwfAction = "";
        try
        {
            Map<String, String[]> parameters = request.getParameterMap();
            if(parameters.containsKey("action")) iwfAction = request.getParameter("action");
            log.debug("Running forms api POST call action: " + iwfAction);
            String inJson = request.getParameter("jsonConfig");
            JsonElement jelement = new JsonParser().parse(inJson);
            if(iwfAction.equals("saveFormSet"))
            {
                JsonObject  formGroup = jelement.getAsJsonObject();

/*
                formSetId: thisFormSet.id,
                        name: thisFormSet.name,
                    projectName: thisFormSet.projectName,
                    projectId: thisFormSet.projectId,
                    settings: JSON.stringify(JSON.stringify(settingsOut))
*/
                String fsIdStr = formGroup.get("formSetId").getAsString();
                int fsId = new Integer(fsIdStr).intValue();
                FormSet fs = null;
                log.debug("Form set ID is: " + fsId);
                if(fsId==0)
                {
                    fs = new FormSet(formGroup.get("name").getAsString());
                }
                else
                {
                    fs = formsetRepository.findById(fsId);
                }
                log.debug("Have formset: " + fs.getName());
                fs.setName(formGroup.get("name").getAsString());
                fs.setProjectId(formGroup.get("projectId").getAsString());
                fs.setProjectName(formGroup.get("projectName").getAsString());
                fs.setSettings(formGroup.get("settings").getAsString());

                log.debug("Saving");

                fs = formsetRepository.save(fs);

                jout.addProperty("status","OK");
                jout.addProperty("message","form group saved, id: " + fs.getId());
            }
            else if(iwfAction.equals("saveFormBasic"))
            {
                JsonObject  inForm = jelement.getAsJsonObject();
                int fsId = new Integer(inForm.get("formSetId").getAsString()).intValue();
                FormSet fs = formsetRepository.findById(fsId);
                Form f;
                int formId = new Integer(inForm.get("formId").getAsString()).intValue();
                log.debug("Form set ID is: " + formId);
                if(formId==0)
                {
                    f = new Form("tbd",fs);
                }
                else
                {
                    f = formRepository.findById(formId);
                }
                log.debug("Have form");

                f.setName(inForm.get("formName").getAsString());
                f.setIssueType(inForm.get("issueType").getAsString());
                f.setTestIssue(inForm.get("testIssue").getAsString());
                if(inForm.has("formAnon")) f.setFormAnon(inForm.get("formAnon").getAsString());
                if(inForm.has("formProxy")) f.setFormProxy(inForm.get("formProxy").getAsString());
                f.setFormType(inForm.get("formType").getAsString());

                log.debug("Saving");

                f = formRepository.save(f);

                jout.addProperty("status","OK");
                jout.addProperty("message","form saved, id: " + f.getId());

            }
            else if(iwfAction.equals("saveFormConfig"))
            {
                JsonObject  inForm = jelement.getAsJsonObject();
                //int fsId = new Integer(inForm.get("formSetId").getAsString()).intValue();
                //FormSet fs = formsetRepository.findById(fsId);
                Form f = null;
                int formId = inForm.get("formId").getAsInt();
                log.debug("Saving Form ID is: " + formId);

                //todo fails on long string...need the long string ID for data.
                //backupConfigToVersion(hostUser);

                f = formRepository.findById(formId);
                f.setName(inForm.get("formName").getAsString());
                f.setIssueType(inForm.get("issueType").getAsString());
                f.setTestIssue(inForm.get("testIssue").getAsString());
                if(inForm.has("formAnon")) f.setFormAnon(inForm.get("formAnon").getAsString());
                if(inForm.has("formProxy")) f.setFormProxy(inForm.get("formProxy").getAsString());
                f.setFormType(inForm.get("formType").getAsString());
                f.setSettings(inForm.get("formSettings").getAsString());
                f.setFields(inForm.get("fields").getAsString());

                f = formRepository.save(f);
                log.debug("Form is saved: " + formId);
                jout.addProperty("status","OK");
                jout.addProperty("message","form saved, id: " + f.getId());

            }
            else if(iwfAction.equals("saveSnippet"))
            {
                JsonObject  inSippet = jelement.getAsJsonObject();
                int fsId = new Integer(inSippet.get("formSetId").getAsString()).intValue();
                FormSet fs = formsetRepository.findById(fsId);
                Snippet s;
                int snippetId = new Integer(inSippet.get("snippetId").getAsString()).intValue();
                log.debug("Snippet ID is: " + snippetId);
                if(snippetId==0)
                {
                    s = new Snippet("tbd",fs);
                }
                else
                {
                    s = snippetRepository.findById(snippetId);
                }
                log.debug("Have form");

                s.setName(inSippet.get("name").getAsString());
                s.setSnippet(inSippet.get("snippet").getAsString());

                log.debug("Saved Snippet");

                s = snippetRepository.save(s);

                jout.addProperty("status","OK");
                jout.addProperty("result", s.getId().toString());

            }
            else if(iwfAction.equals("deleteFormConfig"))
            {
                JsonObject  inForm = jelement.getAsJsonObject();

                Form f;
                int formId = inForm.get("formId").getAsInt();
                log.debug("Form ID is: " + formId);

                f = formRepository.findById(formId);

                log.debug("Deleting form " + f.getId());

                formRepository.delete(f);

                jout.addProperty("status","OK");
                jout.addProperty("message","form deleted.");
            }
            else if(iwfAction.equals("deleteFormSet"))
            {
                JsonObject  inForm = jelement.getAsJsonObject();

                int fsId = new Integer(inForm.get("formSetId").getAsString()).intValue();
                FormSet fs = formsetRepository.findById(fsId);
                log.debug("Deleting Form ID Set : " + fsId);

                formsetRepository.delete(fs);

                jout.addProperty("status","OK");
                jout.addProperty("message","form set deleted.");
            }
            else
            {
                log.error("Invalid action requested: " + iwfAction);
                jout.addProperty("status","error");
                jout.addProperty("message","");
            }

        }
        catch(Exception e)
        {
            log.error("Error running forms api for action: " + iwfAction,e);
            jout.addProperty("status","error");
            jout.addProperty("message","Failed to run api call");
            jout.addProperty("resultSet",e.getMessage());
        }
        return jout.toString();
    }

    private void backupConfigToVersion(AtlassianHostUser hostUser)
    {
        StringBuilder sb = new StringBuilder("{\"status\":\"OK\",\"resultSet\":[");
        int rCnt = 0;
        for (FormSet fs : formsetRepository.findAll()) {
            sb.append(FormUtils.getAoFormSetJson(fs));
        }
        sb.append("{}],\"customTypes\":[");
        for (com.idealfed.forms.model.CustomType ct : customTypeRepository.findAll())
        {
            sb.append(FormUtils.getCustomTypeJson(ct));
        }
        sb.append("{}]}");

        Version v = new Version(); //ao.create(Version.class);
        v.setDate(new Date());
        Optional<String> uId = hostUser.getUserAccountId();
        v.setAuthor(uId.get());
        v.setConfig(sb.toString());
        v = versionRepository.save(v);
        cleanVersions(50);
    }
    private void cleanVersions(int keepNum)
    {
        try
        {
            int lCnt = 0;
            for (Version v : versionRepository.findAllByOrderByIdDesc())
            {
                if(lCnt>keepNum) versionRepository.delete(v);
                lCnt++;
            }
            log.debug("deleting versions older than last " + keepNum);
        }
        catch(Exception ve)
        {
            log.error("Failed to get version: " + ve.getMessage());
        }
    }

    /**************************************************************************************
        functions below are test
    **************************************************************************************/

    @RequestMapping(value = "/user", method = GET, produces = "application/json")
    @ResponseBody
    public AtlassianHostUser getData(@AuthenticationPrincipal AtlassianHostUser hostUser) {

        Optional<String> userId = hostUser.getUserAccountId();

        log.debug("User Id is: " + userId.get());

        return hostUser;
    }

    @RequestMapping(value = "/host", method = GET, produces = "application/json")
    public AtlassianHost getUser(@AuthenticationPrincipal AtlassianHostUser hostUser) {
        Optional<String> user = hostUser.getUserAccountId();
        AtlassianHost ah = hostUser.getHost();
       return ah;
    }

    @RequestMapping(value = "/add", method = GET, produces = "application/json")
    @ResponseBody
    public String getServerInfo(@AuthenticationPrincipal AtlassianHostUser hostUser) {

//        String json = atlassianHostRestClients
//                .authenticatedAsAddon(hostUser.getHost())
//                .getForObject("/rest/api/3/serverInfo", String.class);

        formsetRepository.save(new FormSet("test1","TPO","Test Project One",null));


        log.debug("Done");
        JsonObject jout = new JsonObject();
        jout.addProperty("status","success");
        jout.addProperty("message","records added");
        jout.addProperty("results","");
        return jout.toString();

    }
    @RequestMapping(value = "/list", method = GET, produces = "application/json")
    @ResponseBody
    public String getFormSetList(@AuthenticationPrincipal AtlassianHostUser hostUser) {
        JsonObject jout = new JsonObject();
        jout.addProperty("status","tbd");
        jout.addProperty("message","tbd");
        jout.addProperty("results","tbd");

        String json = atlassianHostRestClients
                .authenticatedAsAddon(hostUser.getHost())
                .getForObject("/rest/api/3/serverInfo", String.class);

        JsonArray ja = new JsonArray();
        JsonObject jo = null;
        int rCnt = 0;
        for (FormSet f : formsetRepository.findAll()) {
            jo=new JsonObject();
            jo.addProperty("id",f.getId().toString());
            jo.addProperty("name",f.getName());
            jo.addProperty("projectName",f.getProjectName());
            jo.addProperty("projectId",f.getProjectId());
            jo.addProperty("settings",f.getSettings());
            ja.add(jo);
            rCnt++;
        }
        log.debug("Done");
        jout.addProperty("status","success");
        jout.addProperty("message","Listed: " + rCnt);
        jout.add("results",ja);
        return jout.toString();

    }

    @RequestMapping(value = "/clear", method = GET, produces = "application/json")
    @ResponseBody
    public String clearData(@AuthenticationPrincipal AtlassianHostUser hostUser){
        JsonObject jo = new JsonObject();
        log.debug("Running clear call...");
        for (FormSet f : formsetRepository.findAll()) {
            log.debug("Deleting " + f.getName());
            formsetRepository.delete(f);
        }
        log.debug("Done");
        JsonObject jout = new JsonObject();
        jout.addProperty("status","success");
        jout.addProperty("message","records deleted");
        jout.addProperty("results","");
        return jout.toString();
    }


    @RequestMapping(value = "/getIssue", method = GET, produces = "application/json")
    public Object getIssue(@AuthenticationPrincipal AtlassianHostUser hostUser) {

        Object json = atlassianHostRestClients
                .authenticatedAsAddon(hostUser.getHost())
                .getForObject("/rest/api/2/issue/FTP-1", String.class);
        return json;
    }

    @RequestMapping(value = "/helloworld", method = RequestMethod.GET)
    @ResponseBody
    public String helloWorld(@AuthenticationPrincipal AtlassianHostUser hostUser) {
        return "hello-world";
    }

}
