package com.nhc.CareerNest.config.language;

import java.util.Locale;

import org.springframework.context.MessageSource;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.LocaleResolver;

import com.nhc.CareerNest.util.common.WebUtils;

import jakarta.servlet.http.HttpServletRequest;

@Component
public class LocalizationUtils {

    private final MessageSource messageSource;
    private final LocaleResolver localeResolver;

    public LocalizationUtils(
            MessageSource messageSource,
            LocaleResolver localeResolver) {
        this.messageSource = messageSource;
        this.localeResolver = localeResolver;
    }

    public String getLocalizedMessage(String messageKey, Object... param) {
        HttpServletRequest request = WebUtils.getCurrentRequest();
        Locale locale = localeResolver.resolveLocale(request);
        return messageSource.getMessage(messageKey, param, locale);
    }
}
