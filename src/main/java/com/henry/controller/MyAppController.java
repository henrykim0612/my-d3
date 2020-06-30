package com.henry.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MyAppController {

    @GetMapping("/myapp/line")
    public String line() {
        return "myapp/line";
    }
    
    @GetMapping("/myapp/pie")
    public String pie() {
        return "myapp/pie";
    }

    @GetMapping("/myapp/horizontal-bar")
    public String horizontalBar() {
        return "myapp/horizontalBar";
    }

    @GetMapping("/myapp/bar")
    public String bar() {
        return "myapp/bar";
    }

    @GetMapping("/myapp/time-xaxis-bar")
    public String timeXAxisBar() {
        return "myapp/timeXAxisBar";
    }
    
}
