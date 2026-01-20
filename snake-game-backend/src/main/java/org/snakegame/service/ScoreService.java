package org.snakegame.service;

import org.snakegame.model.Score;
import org.snakegame.repository.ScoreRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScoreService {

    private final ScoreRepository repository;

    public ScoreService(ScoreRepository repository) {
        this.repository = repository;
    }

    public Score saveScore(Score score) {
        return repository.save(score);
    }

    public List<Score> getTopScores() {
        return repository.findTop10ByOrderByScoreDesc();
    }
}
