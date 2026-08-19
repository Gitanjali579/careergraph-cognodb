package com.careergraph.controller;

import com.careergraph.repository.GraphRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/skills")
@CrossOrigin(origins = "http://localhost:5173")
public class SkillController {

    private final GraphRepository graphRepository;

    public SkillController(GraphRepository graphRepository) {
        this.graphRepository = graphRepository;
    }

    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getAllSkills() {
        return ResponseEntity.ok(
                graphRepository.findAllSkills()
        );
    }
}