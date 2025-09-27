package com.example.ShutterStrike.GameStateMachine;

import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;

import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

@Service
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

    public volatile States gameState = States.IDLE;

    @Scheduled(fixedDelay = 1000)
    public void superLoop() {

        switch (gameState) {
            case IDLE:
                printGameState();            
                break;

            case AWAITING_PLAYERS:
                printGameState();            
                break;

            case GAME_INIT:
                printGameState();            
                break;

            case GAME_ONGOING:
                printGameState();            
                break;

            case GAME_RESULTS:
                printGameState();            
                break;
        }
    }

    private void printGameState() {
        log.info("Current State: {}", gameState);
    }

    public String getCurrentState() {
        return gameState.name();
    }

    //
    // GAME LOGIC
    //

    public void initLobby() {
        if(gameState == States.IDLE) {
            log.info("Initializing lobby");
            gameState = States.AWAITING_PLAYERS;
        }
        else {
            log.info("Invalid lobby initialization. Wrong state.");
        }
    }

}
