package com.careergraph.controller;

import com.careergraph.service.CareerService;
import com.careergraph.service.GraphService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class GraphController {

    private final GraphService graphService;
    private final CareerService careerService;

    public GraphController(
            GraphService graphService,
            CareerService careerService) {

        this.graphService = graphService;
        this.careerService = careerService;
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> health() {

        boolean databaseAvailable =
                graphService.isDatabaseAvailable();

        Map<String, Object> response = Map.of(
                "application", "CareerGraph",
                "status", databaseAvailable ? "UP" : "DOWN",
                "database", databaseAvailable ? "UP" : "DOWN"
        );

        if (databaseAvailable) {
            return ResponseEntity.ok(response);
        }

        return ResponseEntity
                .status(503)
                .body(response);
    }

    @GetMapping("/graph/developer/{id}")
    public ResponseEntity<List<Map<String, Object>>> getDeveloperGraph(
            @PathVariable String id) {

        return ResponseEntity.ok(
                graphService.getDeveloperGraph(id)
        );
    }

    @GetMapping("/recommendations/{id}")
    public ResponseEntity<List<Map<String, Object>>> getRecommendations(
            @PathVariable String id) {

        return ResponseEntity.ok(
                careerService.getRecommendations(id)
        );
    }
}