package com.henry.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/d3")
public class D3Controller {

    @GetMapping("/exam1")
    public String exam1() {
        return "/d3-exam/exam1";
    }

    @GetMapping("/exam2")
    public String exam2() {
        return "/d3-exam/exam2";
    }

}
