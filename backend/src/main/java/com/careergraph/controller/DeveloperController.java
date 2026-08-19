package com.careergraph.controller;

import com.careergraph.service.DeveloperService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/developers")
@CrossOrigin(origins = "http://localhost:5173")
public class DeveloperController {

    private final DeveloperService developerService;

    public DeveloperController(DeveloperService developerService) {
        this.developerService = developerService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getDeveloper(@PathVariable String id) {

        Map<String, Object> developer =
                developerService.getDeveloper(id);

        if (developer == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(developer);
    }

    @GetMapping("/{id}/skills")
    public ResponseEntity<List<Map<String, Object>>> getDeveloperSkills(
            @PathVariable String id) {

        return ResponseEntity.ok(
                developerService.getDeveloperSkills(id)
        );
    }
}