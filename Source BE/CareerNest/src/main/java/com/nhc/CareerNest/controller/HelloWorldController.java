package com.nhc.CareerNest.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/api/v1")
public class HelloWorldController {

    @GetMapping("/")
    public String helloWorld() {
        return "Nguyen Huu Cuong";
    }

}
