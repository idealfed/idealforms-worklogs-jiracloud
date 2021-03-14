package com.idealfed.forms;

import com.atlassian.connect.spring.AtlassianHost;
import com.atlassian.connect.spring.AtlassianHostRestClients;
import com.atlassian.connect.spring.AtlassianHostUser;
import com.google.common.collect.Maps;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.idealfed.forms.model.Form;
import com.idealfed.forms.model.FormSet;
import com.idealfed.forms.model.IftVersion;
import com.idealfed.forms.model.IftFormSet;
import com.idealfed.forms.repositories.IftFormSetRepository;
import com.idealfed.forms.repositories.IftVersionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.MultipartBodyBuilder;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.HandlerMapping;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.net.URLDecoder;
import java.util.*;
import com.idealfed.forms.FormUtils;

import static org.springframework.web.bind.annotation.RequestMethod.*;


@RestController
public class IftProductController {
    private static final Logger log = LoggerFactory.getLogger(DataController.class);

    @Autowired
    private AtlassianHostRestClients atlassianHostRestClients;

    @Autowired
    private IftVersionRepository iftVersionRepository;
    @Autowired
    private IftFormSetRepository iftFormSetRepository;

    @RequestMapping(value = "/ift/rest/**", method = GET, produces = "application/json")
    public String iftGetCall(@AuthenticationPrincipal AtlassianHostUser hostUser, HttpServletRequest request,
                HttpServletResponse response) {

        log.debug("Running GET api call...");
        JsonObject jout = new JsonObject();
        jout.addProperty("status","tbd");
        jout.addProperty("message","tbd");
        jout.addProperty("resultSet","");
        String rootPathParam="";

        try
        {
            Map<String, String[]> parameters = request.getParameterMap();
            String restOfTheUrl = (String) request.getAttribute(HandlerMapping.PATH_WITHIN_HANDLER_MAPPING_ATTRIBUTE);
            log.debug("Rest of url: " + restOfTheUrl);
            String[] pathArray = restOfTheUrl.split("/");
            rootPathParam = pathArray[3];
            log.debug("Path param 1 is: " + rootPathParam);

            if(rootPathParam.equals("products")) {

                StringBuilder sb = new StringBuilder("{\"status\":\"OK\",\"resultSet\":[");
                int rCnt = 0;
                for (com.idealfed.forms.model.IftFormSet ifs : iftFormSetRepository.findAll())
                {
                    sb.append(getProductJson(ifs));
                }
                sb.append("{}]}");

                return sb.toString();
            }
            if(rootPathParam.equals("product")) {
                String productIdStr = pathArray[4];
                log.debug("Path param 2 is: " + productIdStr);
                String subAction  = pathArray[5];
                log.debug("Path param 3 is: " + subAction);

                int productId = new Integer(productIdStr).intValue();
                IftFormSet ifs = iftFormSetRepository.findById(productId);
                if(subAction.equals("versions")) {
                    StringBuilder sb = new StringBuilder("{\"status\":\"OK\",\"resultSet\":[");
                    int rCnt = 0;
                    for (com.idealfed.forms.model.IftVersion iftVersion : iftVersionRepository.findByIftFormSet(ifs)) {
                        sb.append(getProductVersionJson(iftVersion, false));
                    }
                    sb.append("{}]}");
                    return sb.toString();
                }
                else if(subAction.equals("version")) {
                    String versionIdStr  = pathArray[6];
                    log.debug("Path param 4 is: " + versionIdStr);
                    int versionId = new Integer(versionIdStr).intValue();
                    IftVersion ifv = iftVersionRepository.findById(versionId);
                    jout.addProperty("status","OK");
                    jout.addProperty("result",ifv.getConfig());
                    //sb.append(getProductVersionJson(ifv, true));
                }
                else
                {
                    log.error("Invalid subaction requested");
                    jout.addProperty("status","error");
                    jout.addProperty("result","Invalid");
                }
            }
            else
            {
                log.error("Invalid action requested");
                jout.addProperty("status","error");
                jout.addProperty("result","Invalid");
            }
            return jout.toString();
        }
        catch(Exception e)
        {
            log.debug("Errror from POST api call",e);
            jout.addProperty("status","error");
            jout.addProperty("message","Failed running api post");
            jout.addProperty("resultSet",e.getMessage());
            return jout.toString();
        }
    }
    @RequestMapping(value = "/ift/rest/**", method = POST, produces = "application/json")
    public String iftPostCall(HttpServletRequest request, HttpServletResponse response) {

        log.debug("Running product post api call...");
        JsonObject jout = new JsonObject();
        jout.addProperty("status","tbd");
        jout.addProperty("message","tbd");
        jout.addProperty("resultSet","");
        String iwfAction = "";
        try
        {
            Map<String, String[]> parameters = request.getParameterMap();
            if(parameters.containsKey("action")) iwfAction = request.getParameter("action");
            log.debug("Running product api POST call action: " + iwfAction);
            String inJson = request.getParameter("jsonConfig");
            JsonElement jelement = new JsonParser().parse(inJson);

            if(iwfAction.equals("saveProduct")) {
                JsonObject  inConfigObj = jelement.getAsJsonObject();

                String productIdStr = inConfigObj.get("id").getAsString();
                int productId = new Integer(productIdStr).intValue();
                IftFormSet product = null;
                log.debug("Product ID is: " + productId);
                if(productId==0)
                {
                    product = new IftFormSet(inConfigObj.get("productName").getAsString());
                }
                else
                {
                    product = iftFormSetRepository.findById(productId);
                }
                log.debug("Have product: " + product.getName());
                product.setName(inConfigObj.get("productName").getAsString());
                product.setDescription(inConfigObj.get("productDesc").getAsString());
                product.setProductId(inConfigObj.get("productId").getAsString());

                product = iftFormSetRepository.save(product);
                log.debug("Saved product: " + product.getName());
                jout.addProperty("status","OK");
                jout.addProperty("message","product  saved, id: " + product.getId());
            }
            else if(iwfAction.equals("saveProductVersion")) {
                JsonObject  inConfigObj = jelement.getAsJsonObject();

                String productIdStr = inConfigObj.get("pid").getAsString();
                int productId = new Integer(productIdStr).intValue();
                IftFormSet product = iftFormSetRepository.findById(productId);
                log.debug("Product ID is: " + productId);

                String versionIdStr = inConfigObj.get("id").getAsString();
                int versionId = new Integer(versionIdStr).intValue();
                IftVersion version = null;
                if(versionId==0)
                {
                    version = new IftVersion(product);
                }
                else
                {
                    version = iftVersionRepository.findById(versionId);
                }
                log.debug("Have version: " + version.getVersionId());
                version.setVersionId(inConfigObj.get("version").getAsString());
                version.setDescription(inConfigObj.get("description").getAsString());
                version.setDate(new Date());
                version.setAuthor(inConfigObj.get("author").getAsString());
                if(inConfigObj.has("config"))  version.setConfig(inConfigObj.get("config").getAsString());


                version = iftVersionRepository.save(version);
                log.debug("Saved version: " + version.getVersionId());
                jout.addProperty("status","OK");
                jout.addProperty("message","product  saved, id: " + product.getId());
            }
            else
            {
                log.error("Invalid action requested: " + iwfAction);
                jout.addProperty("status","error");
                jout.addProperty("result","Invalid");
            }

            return jout.toString();
        }
        catch(Exception e)
        {
            log.debug("Errror from POST api call",e);
            jout.addProperty("status","error");
            jout.addProperty("message","Failed running api post");
            jout.addProperty("resultSet",e.getMessage());
            return jout.toString();
        }
    }
    @RequestMapping(value = "/ift/rest/**", method = DELETE, produces = "application/json")
    public String iftDeleteCall(@AuthenticationPrincipal AtlassianHostUser hostUser, HttpServletRequest request,
                                    HttpServletResponse response) {

        log.debug("Running DELETE api call...");
        JsonObject jout = new JsonObject();
        jout.addProperty("status","tbd");
        jout.addProperty("message","tbd");
        jout.addProperty("resultSet","");
        String rootPathParam="";

        try
        {
            Map<String, String[]> parameters = request.getParameterMap();
            String restOfTheUrl = (String) request.getAttribute(HandlerMapping.PATH_WITHIN_HANDLER_MAPPING_ATTRIBUTE);
            log.debug("Rest of url: " + restOfTheUrl);
            String[] pathArray = restOfTheUrl.split("/");
            rootPathParam = pathArray[3];
            log.debug("Path param 1 is: " + rootPathParam);

            if(rootPathParam.equals("product")) {

                String keyParam = pathArray[4];
                log.debug("Getting iftFormSet using Form Id: " + keyParam);
                int iftFormId = new Integer(keyParam).intValue();
                IftFormSet iftFormSet = iftFormSetRepository.findById(iftFormId);
                log.debug("IftFormSet constructed: " + iftFormSet.getName());

                iftFormSetRepository.delete(iftFormSet);
                log.error("deleted ift form set");
                jout.addProperty("status","OK");
                jout.addProperty("result","");

            }
            else if(rootPathParam.equals("version")) {

                String keyParam = pathArray[4];
                log.debug("Getting Version using Form Id: " + keyParam);
                int iftVersionId = new Integer(keyParam).intValue();
                IftVersion iftVersion = iftVersionRepository.findById(iftVersionId);
                log.debug("Version constructed: " + iftVersion.getVersionId());

                iftVersionRepository.delete(iftVersion);
                log.error("deleted ift form set version");
                jout.addProperty("status","OK");
                jout.addProperty("result","");

            }
            else
            {
                log.error("Invalid action requested");
                jout.addProperty("status","error");
                jout.addProperty("result","Invalid");
            }
            return jout.toString();
        }
        catch(Exception e)
        {
            log.debug("Errror from POST api call",e);
            jout.addProperty("status","error");
            jout.addProperty("message","Failed running api post");
            jout.addProperty("resultSet",e.getMessage());
            return jout.toString();
        }
    }
    public static String getProductJson(IftFormSet ifs)
    {
        JsonObject jo = new JsonObject();
        jo.addProperty("id",ifs.getId());
        jo.addProperty("name",ifs.getName());
        jo.addProperty("description",ifs.getDescription());
        jo.addProperty("productId",ifs.getProductId() );

        return jo.toString() + ",";
    }
    public static String getProductVersionJson(IftVersion ifv, boolean withConfig)
    {

        JsonObject jo = new JsonObject();
        jo.addProperty("id",ifv.getId());
        jo.addProperty("version",ifv.getVersionId());
        jo.addProperty("description",ifv.getDescription());
        jo.addProperty("author",ifv.getAuthor() );
        if(withConfig)  jo.addProperty("config",ifv.getConfig() );  //this will not work due to existing escaping
        jo.addProperty("date",ifv.getDate().toString());

        return jo.toString() + ",";
    }
}
