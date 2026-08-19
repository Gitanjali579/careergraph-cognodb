package com.careergraph.service;

import com.careergraph.repository.GraphRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class CareerService {

    private final GraphRepository graphRepository;

    public CareerService(GraphRepository graphRepository) {
        this.graphRepository = graphRepository;
    }

    public List<Map<String, Object>> getAllJobs() {
        return graphRepository.findAllJobs();
    }

    public Map<String, Object> getJob(String id) {
        return graphRepository.findJobById(id);
    }

    public List<Map<String, Object>> getJobSkills(String id) {
        return graphRepository.findJobSkills(id);
    }

    public List<Map<String, Object>> getRecommendations(String developerId) {
        return graphRepository.findRecommendations(developerId);
    }
}