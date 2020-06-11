package com.henry.repository;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Repository;

@Repository
@PropertySource("classpath:dev.properties")
public class SampleRepository {

    @Value("${sample.msg}")
    String msg;

    public String getSampleDate() {
        return msg;
    }

}
