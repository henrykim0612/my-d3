package com.henry.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/d3")
public class D3Controller {

    @GetMapping("/exam1")
    public String exam1() {
        return "d3-exam/exam1";
    }

    @GetMapping("/exam2")
    public String exam2() {
        return "d3-exam/exam2";
    }
    
    
    @GetMapping("/ch4/scatter")
    public String ch4Scatter() {
        return "d3-exam/ch4/scatter";
    }
    
    @GetMapping("/ch4/boxplot")
    public String ch4Boxplot() {
        return "d3-exam/ch4/boxplot";
    }

    @GetMapping("/ch4/line")
    public String ch4Line() {
        return "d3-exam/ch4/line";
    }

    @GetMapping("/ch4/round-line")
    public String ch4RoundLine() {
        return "d3-exam/ch4/roundLine";
    }

    @GetMapping("/ch4/area")
    public String ch4Area() {
        return "d3-exam/ch4/area";
    }


    @GetMapping("/ch5/histogram")
    public String ch5Histogram() {
        return "d3-exam/ch5/histogram";
    }

    @GetMapping("/ch5/pie")
    public String ch5Pie() {
        return "d3-exam/ch5/pie";
    }

    @GetMapping("/ch5/circle-pack")
    public String ch5CirclePack() {
        return "d3-exam/ch5/circlePack";
    }

    @GetMapping("/ch5/dendrogram")
    public String ch5Dendrogram() { return "d3-exam/ch5/dendrogram"; }

    @GetMapping("/ch5/stack")
    public String ch5Stack() {
        return "d3-exam/ch5/stack";
    }

    @GetMapping("/ch5/word-cloud")
    public String wordCloud() {
        return "d3-exam/ch5/wordCloud";
    }

}
