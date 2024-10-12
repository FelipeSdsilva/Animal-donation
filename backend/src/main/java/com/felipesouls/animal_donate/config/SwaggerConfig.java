package com.felipesouls.animal_donate.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition
public class SwaggerConfig {

    @Bean
    public OpenAPI animalAdoptionAPI() {

        return new OpenAPI()
                .info(new Info()
                        .title("Animal Adoption API")
                        .version("1.0")
                        .contact(new Contact()
                                .email("felipe.fps09a@hotmail.com")
                                .name("Felipe Sousa da Silva")
                                .url("https://github.com/felipSdsilva"))
                        .description("This API exposes endpoints to manage animal adoption including registering, updating, and retrieving adoption status of animals.")
                        .termsOfService("https://github.com/felipesousasilva/adocao-animais/terms")
                        .license(new License()
                                .name("SaaS License")
                                .url("https://github.com/felipesousasilva/adocao-animais/license")));
    }
}