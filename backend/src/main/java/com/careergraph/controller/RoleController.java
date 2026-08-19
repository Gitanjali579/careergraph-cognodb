package com.careergraph.controller;

import com.careergraph.service.CareerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/roles")
@CrossOrigin(origins = "http://localhost:5173")
public class RoleController {

    private final CareerService careerService;

    public RoleController(CareerService careerService) {
        this.careerService = careerService;
    }

    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getAllRoles() {
        return ResponseEntity.ok(careerService.getAllJobs());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getRole(@PathVariable String id) {

        Map<String, Object> role =
                careerService.getJob(id);

        if (role == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(role);
    }

    @GetMapping("/{id}/skills")
    public ResponseEntity<List<Map<String, Object>>> getRoleSkills(
            @PathVariable String id) {

        return ResponseEntity.ok(
                careerService.getJobSkills(id)
        );
    }
}