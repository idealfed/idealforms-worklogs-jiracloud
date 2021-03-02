package com.idealfed.forms.api.rest;

import com.atlassian.connect.spring.AtlassianHostUser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

@RestController
public class LifeCycleController {
    private static final Logger log = LoggerFactory.getLogger(LifeCycleController.class);

    @RequestMapping(value="/installed2", method = RequestMethod.POST)
    public static String installApp(@AuthenticationPrincipal AtlassianHostUser hostUser, @RequestBody String payload, HttpServletResponse response) {
        log.info("hostUser: " + hostUser+"; Installing app.  Payload: " + payload);
        response.setStatus(200);
        return "OK";
    }

    @RequestMapping(value="/uninstalled2", method = RequestMethod.POST)
    public static String uninstallApp(@AuthenticationPrincipal AtlassianHostUser hostUser, @RequestBody String payload, HttpServletResponse response) {
        log.info("hostUser: " + hostUser+"; Uninstalling app.  Payload: " + payload);
        response.setStatus(200);
        return "OK";
    }
}
