package com.idealfed.forms;

import com.idealfed.forms.repositories.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackageClasses = {FormsetRepository.class, SnippetRepository.class, CustomTypeRepository.class, FormRepository.class, VersionRepository.class})
public class AddonApplication {

    //@Value("${ijfRoot}")
    public static final String appRoot = "/dev10";
    public static final String productName = "iftWorklogs";

    public static void main(String[] args) throws Exception {
        new SpringApplication(AddonApplication.class).run(args);
    }
}
