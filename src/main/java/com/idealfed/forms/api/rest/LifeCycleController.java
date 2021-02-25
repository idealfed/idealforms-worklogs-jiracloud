package com.idealfed.forms.api.rest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

@RestController
public class LifeCycleController {
    private static final Logger log = LoggerFactory.getLogger(LifeCycleController.class);

    @RequestMapping(value="/installed", method = RequestMethod.POST)
    public static void installApp(@RequestBody String payload, HttpServletResponse response) {
        log.info("Installing app.  Payload: " + payload);
        response.setStatus(200);
    }

    @RequestMapping(value="/uninstalled", method = RequestMethod.POST)
    public static void uninstallApp(@RequestBody String payload, HttpServletResponse response) {
        log.info("Uninstalling app.  Payload: " + payload);
        response.setStatus(200);
    }
}
