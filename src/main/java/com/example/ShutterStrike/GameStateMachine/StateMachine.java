package com.example.ShutterStrike.GameStateMachine;

import java.util.ArrayList;

import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.example.ShutterStrike.Constants.Constants;
import com.example.ShutterStrike.Models.Lobby;
import com.example.ShutterStrike.Models.Player;
import com.example.ShutterStrike.Models.Storm;
import com.example.ShutterStrike.Models.User;

import lombok.extern.slf4j.Slf4j;

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

    //Timer
    int graceSeconds = 30;
    private boolean gracePeriodActive = true;
    private boolean matchActive = false;
    private double matchTimer = 300;
    
    //Storm Timer
    private int stormShrinkCountdown; 
    private int shrinkIntervalSeconds;

    //Objects
    private Lobby lobby;
    private Storm storm;
    protected  Player player;
    public volatile States gameState = States.IDLE;
    public ArrayList<User> newUsersBuffer = new ArrayList<>();

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
                if(lobby == null || storm == null){
                    log.warn("Lobby or storm not initialized");
                    return;
                }
                
                // need to add a check so players cant hurt each other 
                if(graceSeconds > 0){
                    graceSeconds--;
                    log.info("{} seconds of grace remaining.", graceSeconds);
                }else{
                    gracePeriodActive = false;
                    log.info("Grace has ended.");
                }
                
                if (!gracePeriodActive && matchActive) {
                    if (stormShrinkCountdown > 0) {
                        stormShrinkCountdown--;
                    } else {
                        stormShrinkCountdown = shrinkIntervalSeconds; // reset timer
                        storm.shrinkZoneIfReady();
                        log.info("Storm has shrunk!");
                    }
                }

                for (Player player : lobby.getActivePlayers()) {
                    
                    storm.updateStormStatus(player);

                    if (player.isDead()) {
                        log.info("{} has been eliminated.", player.getPlayerName());
                        lobby.removePlayer(player.user.getPlayerUUID());
                    }
                }             

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
