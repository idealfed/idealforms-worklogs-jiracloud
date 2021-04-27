package com.idealfed.forms;

import com.atlassian.connect.spring.AtlassianHost;
import com.atlassian.connect.spring.AtlassianHostRestClients;
import com.atlassian.connect.spring.AtlassianHostUser;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.idealfed.forms.model.*;

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
import org.springframework.http.client.MultipartBodyBuilder;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.util.UriComponentsBuilder;
import com.google.common.collect.Maps;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.*;


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


            if(queryString!=null)
            {

                //trying decoding queryString...
                queryString = URLDecoder.decode(queryString, "UTF-8" );
                apiString += "?" + queryString;
            }

            log.debug("Api get  call: " + apiString);
            String json = atlassianHostRestClients
                    .authenticatedAsHostActor()
                    .getForObject(apiString, String.class);

            log.debug("Results from api call received"); //: " + json);

            return json;
        }
        catch(Exception e)
        {
            log.error("GET error running api call",e);
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
            if(queryString!=null)
            {
                //trying decoding queryString...
                queryString = URLDecoder.decode(queryString, "UTF-8" );
                apiString += "?" + queryString;
            }
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

        log.debug("Running post api call...");
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
            if(queryString!=null)
            {
                //trying decoding queryString...
                queryString = URLDecoder.decode(queryString, "UTF-8" );
                apiString += "?" + queryString;
            }
            log.debug("POST Api call: " + apiString);
            //inbound data
            String json = FormUtils.getBody(request);

            //log.debug("POST Api BODY is: " + json);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            AtlassianHost host = hostUser.getHost();
            HttpEntity entity = null;

            //for attachments
            if(apiString.indexOf("/attachments")>-1)
            {
                log.debug("Working attachments...proxying parts to jira...");
                //need special handling for attachments...
                MultipartBodyBuilder mBuilder = new MultipartBodyBuilder();
                LinkedMultiValueMap<String, Object> partMap = new LinkedMultiValueMap<>();

                MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
                Set set = multipartRequest.getFileMap().entrySet();
                Iterator i = set.iterator();
                while(i.hasNext()) {
                    Map.Entry me = (Map.Entry)i.next();
                    String fileName = (String)me.getKey();
                    MultipartFile multipartFile = (MultipartFile)me.getValue();
                    log.debug("adding file: " + multipartFile.getOriginalFilename());
                    partMap.add("file", new MultipartInputStreamFileResource(multipartFile.getInputStream(), multipartFile.getOriginalFilename()));
                }
                log.debug("Created multivalue map");
                headers.setContentType(MediaType.MULTIPART_FORM_DATA);
                headers.add("X-Atlassian-Token", "no-check");
                HttpEntity<LinkedMultiValueMap<String, Object>> requestEntity = new HttpEntity<>(partMap, headers);
                entity = requestEntity;
            }
            else
            {
                log.debug("Standard post");
                //HttpEntity<String>
                entity = new HttpEntity<String>(json, headers);
            }
            log.debug("Have entity");

            UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(host.getBaseUrl() + apiString);
            RestTemplate restTemplate = atlassianHostRestClients.authenticatedAsHostActor();
            ResponseEntity<String> jResponse = restTemplate.postForEntity(builder.toUriString(), entity, String.class);
            json = jResponse.getBody();
            log.debug("Results from POST api call");//: " + json);
            return json;
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
            if(queryString!=null)
            {
                //trying decoding queryString...
                queryString = URLDecoder.decode(queryString, "UTF-8" );
                apiString += "?" + queryString;
            }

            log.debug("Delete Api call: " + apiString);
            //inbound data
            String json = FormUtils.getBody(request);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            AtlassianHost host = hostUser.getHost();
            HttpEntity<String> entity = new HttpEntity<String>(json, headers);

            UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(host.getBaseUrl() + apiString);

            RestTemplate restTemplate = atlassianHostRestClients.authenticatedAsHostActor();

            restTemplate.delete(builder.toUriString(), entity);

            log.debug("Item deleted");// + apiString);

            jout.addProperty("status","success");
            jout.addProperty("message","delete ran");
        }
        catch(Exception e)
        {
            log.error("Failed delete API call",e);
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

                log.debug("Getting config version: " + paramVersion);

                StringBuilder sb = new StringBuilder("{\"status\":\"OK\",\"resultSet\":[");

                int rCnt = 0;
                if(!paramVersion.equals("0")) {

                    int vId = new Integer(paramVersion).intValue();
                    log.debug("Getting version: " + vId);
                    Version v = versionRepository.findById(vId);
                    return new String(v.getConfig(), StandardCharsets.UTF_8);

                }
                String clientId = hostUser.getHost().getClientKey();
                //active config
                for (FormSet fs : formsetRepository.findAllByCustomerKeyOrderByIdDesc(clientId)) {
                    sb.append(FormUtils.getAoFormSetJson(fs));
                }
                sb.append("{}],\"customTypes\":[");
                for (com.idealfed.forms.model.CustomType ct : customTypeRepository.findAllByCustomerKeyOrderByIdDesc(clientId))
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
                String clientId = hostUser.getHost().getClientKey();

                //this needs to work both ways, inbound string is name of form...
                //inbound int is key to actual formId
                FormSet fs = null;

                int formId =0;
                try {
                    log.debug("Getting FormSet using Form Id: " + formName);
                    formId = new Integer(formName).intValue();
                    Form f = formRepository.findById(formId);
                    log.debug("Form constructed: " + f);
                    fs = f.getFormSet();
                }
                catch(Exception e)
                {
                    log.debug("Getting FormSet using Form by Name: " + formName);
                    formId=0;
                    //need to rip through Forms for customer and get the one formId
                    for (FormSet thisFs : formsetRepository.findAllByCustomerKeyOrderByIdDesc(clientId)) {
                        for (Form f : formRepository.findByFormSet(thisFs)) {
                            if(f.getName().equals(formName)) fs = thisFs;
                            //result is if there are forms of same name, last one wins...
                        }
                    }
                }

                if(fs==null)
                {
                    throw new Exception("Unable to find form set using: " + formName);
                }

                log.debug("Have form set: " + fs.getName());

                int rCnt = 0;
                StringBuilder sb = new StringBuilder("{\"status\":\"OK\",\"resultSet\":[");
                if(fs!=null) sb.append(FormUtils.getAoFormSetJson(fs));
                sb.append("{}],\"customTypes\":[");
                for (com.idealfed.forms.model.CustomType ct : customTypeRepository.findAllByCustomerKeyOrderByIdDesc(clientId))
                {
                    sb.append(FormUtils.getCustomTypeConfig(ct));
                }
                sb.append("{}]}");

                log.debug("Sending configuration Done");
                return sb.toString();
            }
            if(iwfAction.equals("getCustomType")) {
                String customTypeId = "-1";
                if(parameters.containsKey("customTypeId")) customTypeId = request.getParameter("customTypeId");

                log.debug("Get custom type ID: " + customTypeId);
                int ctId = new Integer(customTypeId).intValue();

                CustomType ct = customTypeRepository.findById(ctId);

                StringBuilder sb = new StringBuilder();
                sb.append("{\"id\":\"" + ct.getId() + "\",");
                sb.append("\"name\":\"" + ct.getName() + "\",");
                sb.append("\"description\":\"" + ct.getDescription() + "\",");
                sb.append("\"customType\":\"" + ct.getCustomType() + "\",");
                sb.append("\"fieldName\":\"" + ct.getFieldName() + "\",");
                sb.append("\"settings\":\"" + ct.getSettings() + "\"}");

                log.debug("Sending configuration Done");
                response.setContentType("text/plain");
                return sb.toString();
            }
            if(iwfAction.equals("getVersions")) {


                StringBuilder sb = new StringBuilder("{\"status\":\"OK\",\"resultSet\":[");
                int rCnt = 0;
                //for (Version v : versionRepository.findAll()) {
                String clientId = hostUser.getHost().getClientKey();

                for (Version v : versionRepository.findAllByCustomerKeyOrderByIdDesc(clientId)) {
                    sb.append("{\"id\":\""+v.getId()+"\",\"created\":\""+v.getDate()+"\",\"author\":\""+v.getAuthor()+"\"},");
                }
                sb.append("{}]}");

                log.debug("Sending versions Done");
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
                backupConfigToVersion(hostUser);
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
                String clientId = hostUser.getHost().getClientKey();
                if(formGroup.has("iftFormGroup"))
                {
                    JsonElement je = formGroup.get("iftFormGroup");
                    if(!je.isJsonNull()) fs.setIftFormGroup(je.getAsString());
                }
                if(formGroup.has("iftFormGroupVersion"))
                {
                    JsonElement je = formGroup.get("iftFormGroupVersion");
                    if(!je.isJsonNull()) fs.setIftFormGroupVersion(je.getAsString());
                }

                log.debug("Saving");

                fs = formsetRepository.save(fs);

                jout.addProperty("status","OK");
                jout.addProperty("message","form group saved, id: " + fs.getId());
            }
            else if(iwfAction.equals("saveFormBasic"))
            {
                backupConfigToVersion(hostUser);
                JsonObject  inForm = jelement.getAsJsonObject();
                int fsId = new Integer(inForm.get("formSetId").getAsString()).intValue();
                FormSet fs = formsetRepository.findById(fsId);
                log.debug("Form Set ID is: " + fsId);
                Form f;
                int formId = new Integer(inForm.get("formId").getAsString()).intValue();
                log.debug("Form ID is: " + formId);
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
                f.setFormSet(fs);

                log.debug("Saving");

                f = formRepository.save(f);

                jout.addProperty("status","OK");
                jout.addProperty("message","form saved, id: " + f.getId());

            }
            else if(iwfAction.equals("saveFormConfig"))
            {
                backupConfigToVersion(hostUser);
                JsonObject  inForm = jelement.getAsJsonObject();
                //int fsId = new Integer(inForm.get("formSetId").getAsString()).intValue();
                //FormSet fs = formsetRepository.findById(fsId);
                Form f = null;
                int formId = inForm.get("formId").getAsInt();
                log.debug("Saving Form ID is: " + formId);

                if(formId==0)
                {
                    //formSet must exist by ID and we need it....
                    //OK, now get the object by ID
                    int fsId = new Integer(inForm.get("formSetId").getAsString()).intValue();
                    FormSet fs = formsetRepository.findById(fsId);
                    if(fs==null) throw new Exception("Failed to get formset");
                    f = new Form("tbd",fs);
                }
                else
                {
                    //OK, now get the object by ID
                    f = formRepository.findById(formId);
                }

                f.setName(inForm.get("formName").getAsString());
                f.setIssueType(inForm.get("issueType").getAsString());
                f.setTestIssue(inForm.get("testIssue").getAsString());
                if(inForm.has("formAnon")) f.setFormAnon(inForm.get("formAnon").getAsString());
                if(inForm.has("formProxy")) f.setFormProxy(inForm.get("formProxy").getAsString());
                f.setFormType(inForm.get("formType").getAsString());
                f.setSettings(inForm.get("formSettings").getAsString().getBytes(StandardCharsets.UTF_8));
                f.setFields(inForm.get("fields").getAsString().getBytes(StandardCharsets.UTF_8));

                f = formRepository.save(f);
                log.debug("Form is saved: " + formId);
                jout.addProperty("status","OK");
                jout.addProperty("message","form saved, id: " + f.getId());

            }
            else if(iwfAction.equals("setConfig"))
            {
                JsonObject  jo = jelement.getAsJsonObject();
                log.debug("Have config parsed as json element");
                JsonArray rs = null;
                if(jelement.isJsonArray())
                {
                    log.debug("Element is json Array...casting as such");
                    rs = jo.get("ijfConfig").getAsJsonArray();
                }

                //tests...if not null, this the formSets..
                JsonArray cts = null;
                if(rs==null)
                {
                    //jo is a level down
                    log.debug("js is null, looking down one level...");
                    JsonObject combinedConfig = jo.get("ijfConfig").getAsJsonObject();
                    rs = combinedConfig.getAsJsonArray("formSets");
                    if(rs==null) rs = combinedConfig.getAsJsonArray("resultSet");
                    cts = combinedConfig.getAsJsonArray("customTypes");
                }

                if(rs==null)
                {
                    //bail, we don't want to do this because there is an issue with inbound config
                    throw new Exception("Failed to parse configuration on server.");
                }
                //backup and delete
                backupConfigToVersion(hostUser);
                deleteConfig(hostUser);

                JsonObject jsonFs;
                JsonArray jsonForms;
                JsonObject jsonForm;
                JsonObject jsonSnippet;

                FormSet fs = null;

                for(int i = 0; i<rs.size();i++)
                {
                    jsonFs = rs.get(i).getAsJsonObject();
                    //this is one form set...
                    if(!jsonFs.has("name")) break;
                    fs  = new FormSet(jsonFs.get("name").getAsString());
                    fs.setSettings(jsonFs.get("settings").getAsString());
                    fs.setProjectName(jsonFs.get("projectName").getAsString());
                    fs.setProjectId(jsonFs.get("projectId").getAsString());
                    String clientId = hostUser.getHost().getClientKey();
                    fs.setCustomerKey(clientId);


                    if(jsonFs.has("iftFormGroup"))
                    {
                        JsonElement je = jsonFs.get("iftFormGroup");
                        if(!je.isJsonNull()) fs.setIftFormGroup(je.getAsString());
                    }
                    if(jsonFs.has("iftFormGroupVersion"))
                    {
                        JsonElement je = jsonFs.get("iftFormGroupVersion");
                        if(!je.isJsonNull()) fs.setIftFormGroupVersion(je.getAsString());
                    }


                    fs = formsetRepository.save(fs);

                    jsonForms = jsonFs.get("forms").getAsJsonArray();
                    for(int k = 0; k<jsonForms.size();k++)
                    {
                        jsonForm = jsonForms.get(k).getAsJsonObject();
                        if(!jsonForm.has("name")) break;
                        Form frm = new Form(jsonForm.get("name").getAsString(),fs);
                        frm.setFormSet(fs);

                        String fieldsString = jsonForm.get("fields").getAsString();
                        log.debug("Fields: "+fieldsString);

                        String formSettings = jsonForm.get("formSettings").getAsString();
                        log.debug("Form Settings: "+formSettings);

                        if((jsonForm.has("testIssue")) && (!jsonForm.get("testIssue").isJsonNull())) frm.setTestIssue(jsonForm.get("testIssue").getAsString());
                        if((jsonForm.has("formAnon")) && (!jsonForm.get("formAnon").isJsonNull())) frm.setFormAnon(jsonForm.get("formAnon").getAsString());
                        if((jsonForm.has("formProxy")) && (!jsonForm.get("formProxy").isJsonNull())) frm.setFormProxy(jsonForm.get("formProxy").getAsString());
                        if((jsonForm.has("issueType")) && (!jsonForm.get("issueType").isJsonNull())) frm.setIssueType(jsonForm.get("issueType").getAsString());
                        if((jsonForm.has("formType")) && (!jsonForm.get("formType").isJsonNull())) frm.setFormType(jsonForm.get("formType").getAsString());
                        if((jsonForm.has("fields")) && (!jsonForm.get("fields").isJsonNull())) frm.setFields(fieldsString.getBytes(StandardCharsets.UTF_8));
                        if((jsonForm.has("formSettings")) && (!jsonForm.get("formSettings").isJsonNull())) frm.setSettings(formSettings.getBytes(StandardCharsets.UTF_8));
                        formRepository.save(frm);
                    }

                    jsonForms = jsonFs.get("snippets").getAsJsonArray();
                    for(int k = 0; k<jsonForms.size();k++)
                    {
                        jsonSnippet = jsonForms.get(k).getAsJsonObject();
                        if(!jsonSnippet.has("name")) break;
                        Snippet s = new Snippet(jsonSnippet.get("name").getAsString(),fs);
                        s.setName(jsonSnippet.get("name").getAsString());
                        if((jsonSnippet.has("snippet")) && (!jsonSnippet.get("snippet").isJsonNull()))  s.setSnippet(jsonSnippet.get("snippet").getAsString().getBytes(StandardCharsets.UTF_8));
                        s=snippetRepository.save(s);
                    }
                }

                if(cts!=null)
                {
                    for(int i = 0; i<cts.size();i++)
                    {
                        jsonFs = cts.get(i).getAsJsonObject();
                        if(!jsonFs.has("name")) break;
                        CustomType ct  = new CustomType(jsonFs.get("name").getAsString());
                        if((jsonFs.has("description")) && (!jsonFs.get("description").isJsonNull())) ct.setDescription(jsonFs.get("description").getAsString());
                        if((jsonFs.has("customType")) && (!jsonFs.get("customType").isJsonNull())) ct.setCustomType(jsonFs.get("customType").getAsString());
                        if((jsonFs.has("fieldName")) && (!jsonFs.get("fieldName").isJsonNull())) ct.setFieldName(jsonFs.get("fieldName").getAsString());
                        if((jsonFs.has("settings")) && (!jsonFs.get("settings").isJsonNull())) ct.setSettings(jsonFs.get("settings").getAsString().getBytes(StandardCharsets.UTF_8));
                        String clientId = hostUser.getHost().getClientKey();
                        ct.setCustomerKey(clientId);
                        ct = customTypeRepository.save(ct);
                    }
                }

                jout.addProperty("status","OK");
                jout.addProperty("message","upload complete");
                return jout.toString();

            }
            else if(iwfAction.equals("setGroupConfig"))
            {

                backupConfigToVersion(hostUser);

                JsonObject  inConfig = jelement.getAsJsonObject();
                JsonArray rs = inConfig.getAsJsonArray("ijfConfig");

                JsonObject jsonFs;
                JsonArray jsonForms;
                JsonObject jsonForm;
                JsonObject jsonSnippet;

                if(rs.size()>1)
                {
                    log.error("More than one form group in upload attempt");
                    jout.addProperty("status","Failed");
                    jout.addProperty("message","There is more than one form group in the file.");
                    return jout.toString();
                }

                jsonFs = rs.get(0).getAsJsonObject();
                String fsName = jsonFs.get("name").getAsString();
                Map<String, String> fNames = Maps.newHashMap();

                FormSet fs = null;

                //for each form, look to see if name is being used by all forms other than those owned by this guy
                for (Form f : formRepository.findAll()) {
                    if(f.getName()==null) continue;
                    String tfsName = f.getFormSet().getName();
                    if(tfsName.equals(fsName))
                    {
                        fs = f.getFormSet();
                        continue;
                    }
                    fNames.put(f.getName(),f.getName());
                }

                //rip through new names, make sure not there.
                jsonForms = jsonFs.get("forms").getAsJsonArray();
                for(int k = 0; k<jsonForms.size();k++)
                {
                    jsonForm = jsonForms.get(k).getAsJsonObject();
                    if(fNames.containsKey(jsonForm.get("name").getAsString())==true)
                    {
                        log.error("Name in uploaded group exists in existing group (not by this group name)");
                        jout.addProperty("status","Failed");
                        jout.addProperty("message","Group contains form named in another group");
                        return jout.toString();
                    }
                }

                //if we are here, then look for existing FS and remove it...
                deleteFormSet(fs);

                //load as normal....
                boolean loaded = false;

                for(int i = 0; i<rs.size();i++)
                {
                    jsonFs = rs.get(i).getAsJsonObject();
                    //this is one form set...
                    if(!jsonFs.has("name")) break;
                    fs  = new FormSet(jsonFs.get("name").getAsString());
                    fs.setSettings(jsonFs.get("settings").getAsString());
                    fs.setProjectName(jsonFs.get("projectName").getAsString());
                    fs.setProjectId(jsonFs.get("projectId").getAsString());
                    String clientId = hostUser.getHost().getClientKey();
                    fs.setCustomerKey(clientId);

                    if(jsonFs.has("iftFormGroup"))
                    {
                        JsonElement je = jsonFs.get("iftFormGroup");
                        if(!je.isJsonNull()) fs.setIftFormGroup(je.getAsString());
                    }
                    if(jsonFs.has("iftFormGroupVersion"))
                    {
                        JsonElement je = jsonFs.get("iftFormGroupVersion");
                        if(!je.isJsonNull()) fs.setIftFormGroupVersion(je.getAsString());
                    }

                    fs = formsetRepository.save(fs);

                    jsonForms = jsonFs.get("forms").getAsJsonArray();
                    for(int k = 0; k<jsonForms.size();k++)
                    {
                        jsonForm = jsonForms.get(k).getAsJsonObject();
                        if(!jsonForm.has("name")) break;
                        Form frm = new Form(jsonForm.get("name").getAsString(),fs);
                        frm.setFormSet(fs);
                        frm.setTestIssue(jsonForm.get("testIssue").getAsString());
                        if(jsonForm.has("formAnon")) frm.setFormAnon(jsonForm.get("formAnon").getAsString());
                        if(jsonForm.has("formProxy")) frm.setFormProxy(jsonForm.get("formProxy").getAsString());
                        frm.setIssueType(jsonForm.get("issueType").getAsString());
                        frm.setFormType(jsonForm.get("formType").getAsString());
                        frm.setFields(jsonForm.get("fields").getAsString().getBytes(StandardCharsets.UTF_8));
                        frm.setSettings(jsonForm.get("formSettings").getAsString().getBytes(StandardCharsets.UTF_8));
                        formRepository.save(frm);
                    }

                    jsonForms = jsonFs.get("snippets").getAsJsonArray();
                    for(int k = 0; k<jsonForms.size();k++)
                    {
                        jsonSnippet = jsonForms.get(k).getAsJsonObject();
                        if(!jsonSnippet.has("name")) break;
                        Snippet s = new Snippet(jsonSnippet.get("name").getAsString(),fs);
                        s.setName(jsonSnippet.get("name").getAsString());
                        s.setSnippet(jsonSnippet.get("snippet").getAsString().getBytes(StandardCharsets.UTF_8));
                        s=snippetRepository.save(s);
                    }
                }

                jout.addProperty("status","OK");
                jout.addProperty("message","uploaded, new, id: " + fs.getId());
                return jout.toString();
            }
            else if(iwfAction.equals("saveSnippet"))
            {
                backupConfigToVersion(hostUser);

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
                s.setSnippet(inSippet.get("snippet").getAsString().getBytes(StandardCharsets.UTF_8));

                log.debug("Saved Snippet");

                s = snippetRepository.save(s);

                jout.addProperty("status","OK");
                jout.addProperty("result", s.getId().toString());

            }
            else if(iwfAction.equals("deleteSnippet"))
            {
                backupConfigToVersion(hostUser);
                JsonObject  inSippet = jelement.getAsJsonObject();

                Snippet s;
                int snippetId = new Integer(inSippet.get("snippetId").getAsString()).intValue();
                log.debug("Snippet ID is: " + snippetId);
                s = snippetRepository.findById(snippetId);
                log.debug("Have snippet");

                snippetRepository.delete(s);
                log.debug("Deleted Snippet");

                jout.addProperty("status","OK");
                jout.addProperty("result", "");

            }
            else if(iwfAction.equals("deleteFormConfig"))
            {
                JsonObject  inForm = jelement.getAsJsonObject();

                Form f;
                int formId = inForm.get("formId").getAsInt();
                log.debug("Form ID is: " + formId);

                f = formRepository.findById(formId);

                log.debug("Deleting form " + f.getId());
                backupConfigToVersion(hostUser);

                formRepository.delete(f);


                jout.addProperty("status","OK");
                jout.addProperty("message","form deleted.");
            }
            else if(iwfAction.equals("deleteFormSet"))
            {
                JsonObject  inForm = jelement.getAsJsonObject();

                int fsId = new Integer(inForm.get("formSetId").getAsString()).intValue();
                FormSet fs = formsetRepository.findById(fsId);

                //this does a cascade delete...it did not do this before
                backupConfigToVersion(hostUser);
                log.debug("Deleting Form ID Set : " + fsId);
                deleteFormSet(fs);
                //formsetRepository.delete(fs);

                jout.addProperty("status","OK");
                jout.addProperty("message","form set deleted.");
            }
            else if(iwfAction.equals("saveCustomType"))
            {
                backupConfigToVersion(hostUser);

                JsonObject  customType = jelement.getAsJsonObject();

                String ctIdStr = customType.get("customTypeId").getAsString();
                int fsId = new Integer(ctIdStr).intValue();
                CustomType ct = null;
                log.debug("CT  ID is: " + fsId);
                if(fsId==0)
                {
                    ct = new CustomType(customType.get("name").getAsString());
                }
                else
                {
                    ct = customTypeRepository.findById(fsId);
                }
                log.debug("Have CT: " + ct.getName());
                ct.setName(customType.get("name").getAsString());
                ct.setDescription(customType.get("description").getAsString());
                ct.setCustomType(customType.get("customType").getAsString());
                ct.setSettings(customType.get("settings").getAsString().getBytes(StandardCharsets.UTF_8));
                ct.setFieldName(customType.get("fieldName").getAsString());

                String clientId = hostUser.getHost().getClientKey();
                ct.setCustomerKey(clientId);

                log.debug("Saving");

                ct = customTypeRepository.save(ct);

                jout.addProperty("status","OK");
                jout.addProperty("result",ct.getId().toString());
                jout.addProperty("message","form group saved, id: " + ct.getId());
            }
            else if(iwfAction.equals("deleteCustomType"))
            {
                backupConfigToVersion(hostUser);
                JsonObject  customType = jelement.getAsJsonObject();

                String ctIdStr = customType.get("customTypeId").getAsString();
                int ctId = new Integer(ctIdStr).intValue();
                CustomType ct = customTypeRepository.findById(ctId);
                customTypeRepository.delete(ct);
                jout.addProperty("status","OK");
                jout.addProperty("result",ctIdStr);

            }
            else
            {
                log.error("Invalid action requested: " + iwfAction);
                jout.addProperty("status","error");
                jout.addProperty("result","Invalid");
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

        String clientId = hostUser.getHost().getClientKey();

        for (FormSet fs : formsetRepository.findAllByCustomerKeyOrderByIdDesc(clientId)) {
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
        v.setConfig(sb.toString().getBytes(StandardCharsets.UTF_8));
        v.setCustomerKey(clientId);

        v = versionRepository.save(v);
        cleanVersions(50,hostUser);
        log.debug("Backed up full config");
    }
    private void cleanVersions(int keepNum,AtlassianHostUser hostUser)
    {
        try
        {
            String clientId = hostUser.getHost().getClientKey();
            int lCnt = 0;
            for (Version v : versionRepository.findAllByCustomerKeyOrderByIdDesc(clientId))
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
    private void deleteFormSet(FormSet fs)
    {
        if(fs==null) return;
        for(Form f : fs.getForms())
        {
            formRepository.delete(f);
        }
        for(Snippet s : fs.getSnippets())
        {
            snippetRepository.delete(s);
        }
        formsetRepository.delete(fs);
    }

    private void deleteConfig(AtlassianHostUser hostUser)
    {
        String clientId = hostUser.getHost().getClientKey();
        for(FormSet fs: formsetRepository.findAllByCustomerKeyOrderByIdDesc(clientId))
        {
            if(fs==null) return;
            for(Form f : fs.getForms())
            {
                formRepository.delete(f);
            }
            for(Snippet s : fs.getSnippets())
            {
                snippetRepository.delete(s);
            }
            formsetRepository.delete(fs);
        }
        for(CustomType ct: customTypeRepository.findAll()){
            customTypeRepository.delete(ct);
        }
        log.debug("Deleted full config");

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

        String clientId = hostUser.getHost().getClientKey();
        formsetRepository.save(new FormSet("test1","TPO","Test Project One",null,clientId,null,null));

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
            jo.addProperty("customerKey",f.getCustomerKey());
            jo.addProperty("iftFormGroup",f.getIftFormGroup());
            jo.addProperty("iftFormGroupVersion",f.getIftFormGroupVersion());

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
