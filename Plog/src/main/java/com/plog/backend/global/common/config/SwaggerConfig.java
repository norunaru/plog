package com.plog.backend.global.common.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI openAPI() {
        String jwt = "JWT";
        SecurityRequirement securityRequirement = new SecurityRequirement().addList(jwt);
        Components components = new Components().addSecuritySchemes(jwt, new SecurityScheme()
            .name(jwt)
            .type(SecurityScheme.Type.HTTP)
            .scheme("bearer")
            .bearerFormat("JWT")
        );
        // HTTPS Server 추가
        Server server = new Server()
                .url("https://j11b205.p.ssafy.io/api") // HTTPS 서버 URL
                .description("ploging"); // 서버 설명
        return new OpenAPI()
                .components(new Components())
                .info(apiInfo())
                .addSecurityItem(securityRequirement)
                .components(components)
                .servers(List.of(server)); // 서버 리스트에 HTTPS 서버 추가
    }

    private Info apiInfo() {
        return new Info()
            .title("특화 프로젝트 APIS") // API의 제목
            .description("API 모음집입니다.") // API에 대한 설명
            .version("1.0.0"); // API의 버전
    }
}
