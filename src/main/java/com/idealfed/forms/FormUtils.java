package com.idealfed.forms;

import com.google.gson.JsonObject;
import com.idealfed.forms.model.CustomType;
import com.idealfed.forms.model.Form;
import com.idealfed.forms.model.FormSet;
import com.idealfed.forms.model.Snippet;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.HttpServletRequest;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;

public class FormUtils {
    private static final Logger log = LoggerFactory.getLogger(FormUtils.class);
    public static String getAoFormSetJson(FormSet fs)
    {

        JsonObject jo = new JsonObject();
        jo.addProperty("id",fs.getId());
        jo.addProperty("name",fs.getName());
        jo.addProperty("projectName",fs.getProjectName());
        jo.addProperty("projectId",fs.getProjectId());
        jo.addProperty("customerKey",fs.getCustomerKey());
        jo.addProperty("iftFormGroup",fs.getIftFormGroup());
        jo.addProperty("iftFormGroupVersion",fs.getIftFormGroupVersion());

        String retStr = jo.toString();
        retStr = retStr.substring(0, retStr.length() - 1);
        StringBuilder sb = new StringBuilder();
        sb.append(retStr);

        String sfSettings = fs.getSettings();
        sfSettings = sfSettings.replaceFirst("(?<=proxyPassword\\\\\",\\\\\"value\\\\\":\\\\\")(.*?)(?=\\\\\",\\\\\"comment)","hidden");
        sb.append(",\"settings\":\"" + sfSettings + "\"");

        sb.append(",\"forms\":[");
        for (Form f : fs.getForms())
        {
            sb.append(FormUtils.getAoFormJson(f));
        }
        sb.append("{}],");
        sb.append("\"snippets\":[");
        for (Snippet s : fs.getSnippets()) // (2)
        {
            sb.append(getAoSnippetJson(s));
        }
        sb.append("{}]},");

        return sb.toString();


    }

    public static String getAoFormJson(Form f)
    {
        if(f.getTestIssue().equals("")) f.setTestIssue("~");

        JsonObject jo = new JsonObject();
        jo.addProperty("id",f.getId());
        jo.addProperty("name",f.getName());
        jo.addProperty("testIssue",f.getTestIssue());
        jo.addProperty("formAnon",f.getFormAnon());
        jo.addProperty("formProxy",f.getFormProxy());
        jo.addProperty("issueType",f.getIssueType());
        jo.addProperty("formType",f.getFormType());

        String retStr = jo.toString();
        retStr = retStr.substring(0, retStr.length() - 1);
        retStr=retStr+ ",\"settings\":\"" + f.getSettings() + "\"";
        retStr=retStr+ ",\"fields\":\"" + f.getFields() + "\"},";

        return retStr;


    }
    public static String getAoSnippetJson(Snippet s)
    {
            if(s.getName().equals("")) s.setName("~");
            if(s.getSnippet().equals("")) s.setSnippet("~");

            JsonObject jo = new JsonObject();
            jo.addProperty("id",s.getId());
            jo.addProperty("name",s.getName());
            String retStr = jo.toString();
            retStr = retStr.substring(0, retStr.length() - 1);
            retStr=retStr+ ",\"snippet\":\"" + s.getSnippet() + "\"},";
            return retStr;
    }

    public static String getCustomTypeConfig(CustomType ct)
    {

        JsonObject jo = new JsonObject();
        jo.addProperty("id",ct.getId());
        jo.addProperty("name",ct.getName());
        jo.addProperty("description",ct.getDescription());
        jo.addProperty("customType",ct.getCustomType());
        jo.addProperty("fieldName",ct.getFieldName());
        jo.addProperty("customerKey",ct.getCustomerKey());

        String retStr = jo.toString();
        String cType = ct.getCustomType();
        if(cType.equals("FILE"))
        {
            retStr = retStr.substring(0, retStr.length() - 1);
            retStr=retStr+ ",\"settings\":\"\"[]\"\"},";
        }
        else
        {
            retStr=retStr+ ",";
        }

        return retStr; //sb.toString();
    }

    public static boolean isInteger(String s) {
        try {
            Integer.parseInt(s);
        } catch(NumberFormatException e) {
            return false;
        } catch(NullPointerException e) {
            return false;
        }
        //ugly..but will work
        return true;
    }

    public static String getCustomTypeJson(CustomType ct)
    {

        JsonObject jo = new JsonObject();
        jo.addProperty("id",ct.getId());
        jo.addProperty("name",ct.getName());
        jo.addProperty("description",ct.getDescription());
        jo.addProperty("customType",ct.getCustomType());
        jo.addProperty("fieldName",ct.getFieldName());
        jo.addProperty("customerKey",ct.getCustomerKey());
        String cType = ct.getCustomType();
        String retStr = jo.toString();
        retStr = retStr.substring(0, retStr.length() - 1);
        if(cType.equals("FILE"))
        {
            retStr=retStr+ ",\"settings\":\"\"[]\"\"},";
        }
        else
        {
            retStr=retStr+ ",\"settings\":\"" + ct.getSettings() + "\"},";
        }

        return retStr; //sb.toString();
    }

    public static String getBody(HttpServletRequest request) {

        String body = null;
        StringBuilder stringBuilder = new StringBuilder();
        BufferedReader bufferedReader = null;

        try {
            InputStream inputStream = request.getInputStream();
            if (inputStream != null) {
                bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
                char[] charBuffer = new char[128];
                int bytesRead = -1;
                while ((bytesRead = bufferedReader.read(charBuffer)) > 0) {
                    stringBuilder.append(charBuffer, 0, bytesRead);
                }
            } else {
                stringBuilder.append("");
            }
        } catch (Exception ex) {
            log.error("Failed to read request body: " + ex.getMessage());
        } finally {
            if (bufferedReader != null) {
                try {
                    bufferedReader.close();
                } catch (Exception exx) {
                    log.error("Failed to close buffered reader..leak" + exx.getMessage());
                }
            }
        }
        body = stringBuilder.toString();
        return body;
    }
}
