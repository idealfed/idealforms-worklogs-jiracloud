package com.idealfed.forms;

import com.idealfed.forms.repositories.*;
import org.hibernate.service.spi.InjectService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.util.Arrays;

@Configuration
@SpringBootApplication
@EnableJpaRepositories(basePackageClasses = {FormsetRepository.class, SnippetRepository.class, CustomTypeRepository.class, FormRepository.class, VersionRepository.class})
public class AddonApplication {

    @Autowired
    private Environment environment;

    @Value("${ijfRoot}")
    public static String appRoot = "/dev20";

    private static Logger log = LoggerFactory.getLogger(AddonApplication.class);
    public static final String productName = "iftWorklogs";

    public static void main(String[] args) throws Exception {
        log.debug("App root: "+appRoot);
        new SpringApplication(AddonApplication.class).run(args);
    }

    @PostConstruct
    public void initApplication() throws IOException {
        if (environment.getActiveProfiles().length == 0) {
            log.warn("No Spring profile configured.  Running with default configuration.");
        } else {
            log.info("Running with Spring profile(s): {}", Arrays.toString(environment.getActiveProfiles()));
        }
    }
}
