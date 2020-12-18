package com.idealfed.forms;

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
        StringBuilder sb = new StringBuilder();
        sb.append("{\"id\":\"" + fs.getId() + "\",");
        sb.append("\"name\":\"" + fs.getName() + "\",");
        sb.append("\"projectName\":\"" + fs.getProjectName() + "\",");
        sb.append("\"projectId\":\"" + fs.getProjectId() + "\",");
        String sfSettings = fs.getSettings();
        sfSettings = sfSettings.replaceFirst("(?<=proxyPassword\\\\\",\\\\\"value\\\\\":\\\\\")(.*?)(?=\\\\\",\\\\\"comment)","hidden");
        sb.append("\"settings\":\"" + sfSettings + "\",");
        sb.append("\"forms\":[");

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
        StringBuilder sb = new StringBuilder();
        sb.append("{\"id\":\"" + f.getId() + "\",");
        sb.append("\"name\":\"" + f.getName() + "\",");
        sb.append("\"testIssue\":\"" + f.getTestIssue() + "\",");
        sb.append("\"formAnon\":\"" + f.getFormAnon() + "\",");
        sb.append("\"formProxy\":\"" + f.getFormProxy() + "\",");
        sb.append("\"issueType\":\"" + f.getIssueType() + "\",");
        sb.append("\"formType\":\"" + f.getFormType() + "\",");
        sb.append("\"settings\":\"" + f.getSettings() + "\",");
        sb.append("\"fields\":\"" + f.getFields() + "\"},");
        return sb.toString();
    }
    public static String getAoSnippetJson(Snippet s)
    {
            if(s.getName().equals("")) s.setName("~");
            if(s.getSnippet().equals("")) s.setSnippet("~");
            StringBuilder sb = new StringBuilder();
            sb.append("{\"id\":\"" + s.getId() + "\",");
            sb.append("\"name\":\"" + s.getName() + "\",");
            sb.append("\"snippet\":\"" + s.getSnippet() + "\"},");
            return sb.toString();
    }

    public static String getCustomTypeConfig(CustomType ct)
    {
        StringBuilder sb = new StringBuilder();
        sb.append("{\"id\":\"" + ct.getId() + "\",");
        sb.append("\"name\":\"" + ct.getName() + "\",");
        sb.append("\"description\":\"" + ct.getDescription() + "\",");
        sb.append("\"customType\":\"" + ct.getCustomType() + "\",");
        sb.append("\"fieldName\":\"" + ct.getFieldName() + "\"");

        String cType = ct.getCustomType();
        if(cType.equals("FILE"))
        {
            sb.append(",\"settings\":\"\"[]\"\"},");
        }
        else
        {
            sb.append("},");
        }

        return sb.toString();
    }


    public static String getCustomTypeJson(CustomType ct)
    {
        StringBuilder sb = new StringBuilder();
        sb.append("{\"id\":\"" + ct.getId() + "\",");
        sb.append("\"name\":\"" + ct.getName() + "\",");
        sb.append("\"description\":\"" + ct.getDescription() + "\",");
        sb.append("\"customType\":\"" + ct.getCustomType() + "\",");
        sb.append("\"fieldName\":\"" + ct.getFieldName() + "\",");

        String cType = ct.getCustomType();
        if(cType.equals("FILE"))
        {
            sb.append("\"settings\":\"\"[]\"\"},");
        }
        else
        {
            sb.append("\"settings\":\"" + ct.getSettings() + "\"},");
        }

        return sb.toString();
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
