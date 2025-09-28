package com.example.ShutterStrike.GameStateMachine;

import org.springframework.stereotype.Service;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import lombok.extern.slf4j.Slf4j;
import java.util.ArrayList;
import com.example.ShutterStrike.Models.User;
import com.example.ShutterStrike.Constants.Constants;

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
    public ArrayList<User> newUsersBuffer = new ArrayList<User>();

    @Scheduled(fixedDelay = 1000)
    public void superLoop() {

        switch (gameState) {
            case IDLE:

                break;

            case AWAITING_PLAYERS:
                for(int i = 0; i < newUsersBuffer.size() && i < Constants.MAX_PLAYERS; i++) {
                    log.info("User {}: {}", i, newUsersBuffer);



                }
                break;

            case GAME_INIT:

                break;

            case GAME_ONGOING:

                break;

            case GAME_RESULTS:

                break;
        }
    }

    private void printGameState() {
        log.info("Current State: {}", gameState);
    }

    //
    // GAME LOGIC
    //

    public void initLobby() {
        if(gameState == States.IDLE) {
            log.info("Initializing lobby");
            gameState = States.AWAITING_PLAYERS;
            printGameState();
        }
        else {
            log.info("Invalid lobby initialization. Wrong state.");
        }
    }

}
