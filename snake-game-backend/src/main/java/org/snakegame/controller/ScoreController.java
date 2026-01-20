package org.snakegame.controller;

import org.snakegame.model.Score;
import org.snakegame.service.ScoreService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/scores")
@CrossOrigin(origins = "*")
public class ScoreController {

    private final ScoreService service;

    public ScoreController(ScoreService service) {
        this.service = service;
    }

    @PostMapping
    public Score saveScore(@RequestBody Score score) {
        return service.saveScore(score);
    }

    @GetMapping
    public List<Score> getScores() {
        return service.getTopScores();
    }
}
