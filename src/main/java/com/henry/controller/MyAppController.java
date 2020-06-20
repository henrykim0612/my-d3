package com.henry.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MyAppController {

    @GetMapping("/myapp/app1")
    public String myApp1() {
        return "/myapp/app1";
    }
    
    
}
