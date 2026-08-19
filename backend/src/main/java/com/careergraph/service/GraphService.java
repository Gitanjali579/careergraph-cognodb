package com.careergraph.service;

import com.careergraph.repository.GraphRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class GraphService {

    private final GraphRepository graphRepository;

    public GraphService(GraphRepository graphRepository) {
        this.graphRepository = graphRepository;
    }

    public List<Map<String, Object>> getDeveloperGraph(String developerId) {
        return graphRepository.findDeveloperGraph(developerId);
    }

    public boolean isDatabaseAvailable() {
        return graphRepository.checkConnection();
    }
}