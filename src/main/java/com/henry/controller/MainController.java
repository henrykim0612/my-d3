package com.henry.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.henry.service.SampleService;

import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
public class MainController {

    private final SampleService service;

    public MainController(SampleService service) {
        this.service = service;
    }

    @RequestMapping(value = {"/", "/index"}, method = RequestMethod.GET)
    public String index(ModelMap map) {
        log.info("Welcome to my Spring-MVC !!");
        map.put("sampleData", service.getSampleData());
        return "index";
    }
    
    @RequestMapping(value = {"/test"}, method = RequestMethod.GET)
    public String myTestbed(ModelMap map) {
        return "test/test";
    }
    

}
