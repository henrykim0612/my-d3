package com.henry.service;

import com.henry.repository.SampleRepository;
import org.springframework.stereotype.Service;

@Service
public class SampleService {

    private final SampleRepository repo;

    // Spring 4.3 이상부터는 @Autowired 없어도 됨.
    public SampleService(SampleRepository repo) {
        this.repo = repo;
    }

    public String getSampleData() {
        return repo.getSampleDate();
    }

}
