package com.idealfed.forms.api.rest;

import com.atlassian.connect.spring.AtlassianHostUser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

@RestController
public class AppLifeCycleController {
    private static final Logger log = LoggerFactory.getLogger(AppLifeCycleController.class);

    private AppLifeCycleController() {
        log.info("I am the LifeCycleController...");
    }

    @RequestMapping(value="/app-installed", method = RequestMethod.POST)
    public static String installApp(@AuthenticationPrincipal AtlassianHostUser hostUser, @RequestBody String payload, HttpServletResponse response) {
        log.info("hostUser: " + hostUser+"; Installing app.  Payload: " + payload);
        response.setStatus(200);
        return "OK";
    }

    @RequestMapping(value="/test", method = RequestMethod.GET)
    public static String test(@AuthenticationPrincipal AtlassianHostUser hostUser, HttpServletResponse response) {
        log.info("hostUser: " + hostUser+"; Test Call...");
        response.setStatus(200);
        return "OK";
    }

    @RequestMapping(value="/app-uninstalled", method = RequestMethod.POST)
    public static String uninstallApp(@AuthenticationPrincipal AtlassianHostUser hostUser, @RequestBody String payload, HttpServletResponse response) {
        log.info("hostUser: " + hostUser+"; Uninstalling app.  Payload: " + payload);
        response.setStatus(200);
        return "OK";
    }

    @RequestMapping(value="/app-enabled", method = RequestMethod.POST)
    public static String enableApp(@AuthenticationPrincipal AtlassianHostUser hostUser, @RequestBody String payload, HttpServletResponse response) {
        log.info("hostUser: " + hostUser+"; Enabling app.  Payload: " + payload);
        response.setStatus(200);
        return "OK";
    }

    @RequestMapping(value="/app-disabled", method = RequestMethod.POST)
    public static String disableApp(@AuthenticationPrincipal AtlassianHostUser hostUser, @RequestBody String payload, HttpServletResponse response) {
        log.info("hostUser: " + hostUser+"; Disabling app.  Payload: " + payload);
        response.setStatus(200);
        return "OK";
    }


}
