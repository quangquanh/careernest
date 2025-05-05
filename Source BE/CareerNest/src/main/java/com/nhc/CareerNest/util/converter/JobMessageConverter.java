package com.nhc.CareerNest.util.converter;

import java.util.Collections;

import org.springframework.kafka.support.converter.JsonMessageConverter;
import org.springframework.kafka.support.mapping.DefaultJackson2JavaTypeMapper;
import org.springframework.kafka.support.mapping.Jackson2JavaTypeMapper;

import com.nhc.CareerNest.domain.entity.Job;

public class JobMessageConverter extends JsonMessageConverter {
    public JobMessageConverter() {
        super();
        DefaultJackson2JavaTypeMapper typeMapper = new DefaultJackson2JavaTypeMapper();
        typeMapper.setTypePrecedence(Jackson2JavaTypeMapper.TypePrecedence.TYPE_ID);
        typeMapper.addTrustedPackages("com.nhc.CareerNest");
        typeMapper.setIdClassMapping(Collections.singletonMap("job", Job.class));
        this.setTypeMapper(typeMapper);
    }
}
