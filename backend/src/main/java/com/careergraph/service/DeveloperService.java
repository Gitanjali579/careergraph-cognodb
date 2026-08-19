package com.careergraph.service;

import com.careergraph.repository.GraphRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class DeveloperService {

    private final GraphRepository graphRepository;

    public DeveloperService(GraphRepository graphRepository) {
        this.graphRepository = graphRepository;
    }

    public Map<String, Object> getDeveloper(String id) {
        return graphRepository.findDeveloperById(id);
    }

    public List<Map<String, Object>> getDeveloperSkills(String id) {
        return graphRepository.findDeveloperSkills(id);
    }
}