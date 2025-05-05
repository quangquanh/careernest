package com.nhc.CareerNest.config.security;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class CorsConfig {
        @Bean
        public CorsConfigurationSource corsConfigurationSource() {
                CorsConfiguration configuration = new CorsConfiguration();
                configuration.setAllowedOrigins(
                                Arrays.asList("http://localhost:3000", "http://34.132.23.249:3000",
                                                "http://34.132.23.249"));
                configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE",
                                "OPTIONS")); // Allowed methods
                configuration.setAllowedHeaders(Arrays.asList(
                                "Authorization",
                                "Content-Type",
                                "Accept",
                                "x-no-retry")); // Header này để xác nhận phiên bản WebSocket));
                configuration.setAllowCredentials(true);
                configuration.setMaxAge(3600L);

                UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
                source.registerCorsConfiguration("/**", configuration); // Apply this configuration to all paths
                return source;
        }
}
