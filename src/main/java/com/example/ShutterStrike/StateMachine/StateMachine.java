package com.example.ShutterStrike.StateMachine;

import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Component
@EnableScheduling
@Slf4j
public class StateMachine {

    public enum States {
        IDLE,
        AWAITING_PLAYERS,
        GAME_INIT,
        GAME_ONGOING,
        GAME_RESULTS
    }

    private States gameState = States.IDLE;

    @Scheduled(fixedDelay = 200)
    public void superLoop() {

        switch (gameState) {
            case IDLE:
                printGameState();            

                gameState = States.AWAITING_PLAYERS;
                break;

            case AWAITING_PLAYERS:
                printGameState();            

                gameState = States.GAME_INIT;
                break;

            case GAME_INIT:
                printGameState();            

                gameState = States.GAME_ONGOING;
                break;

            case GAME_ONGOING:
                printGameState();            

                gameState = States.GAME_RESULTS;
                break;

            case GAME_RESULTS:
                printGameState();            

                gameState = States.IDLE;
                break;
        }
    }

    private void printGameState() {
        log.info("Current State: {}", gameState);
    }
}
