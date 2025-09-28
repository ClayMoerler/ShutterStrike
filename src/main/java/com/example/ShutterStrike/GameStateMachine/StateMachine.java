package com.example.ShutterStrike.GameStateMachine;

import java.util.ArrayList;
import java.util.Iterator;

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
    private Player matchWinner;
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
                if (lobby == null) {
                    lobby = new Lobby();
                }

                for (int i = 0; i < newUsersBuffer.size() && i < Constants.MAX_PLAYERS; i++) {
                    User user = newUsersBuffer.get(i);
                    Player player = new Player();

                // Set host for first player
                if (lobby.getActivePlayers().isEmpty()) {
                    player.setHost(true);
                    log.info("{} has joined as the host.", player.user.getPlayerUUID());
                } else {
                    player.setHost(false);
                    log.info("{} has joined the game.", player.user.getPlayerUUID());
                }

                lobby.addPlayer(player);
            }

            newUsersBuffer.clear(); // clear the buffer after processing
            log.info("Total players in lobby: {}", lobby.getActivePlayers().size());

            // Optional: move to GAME_INIT if ready
            if (lobby.getActivePlayers().size() >= Constants.MIN_PLAYERS_TO_START) {
                gameState = States.GAME_INIT;
                log.info("Minimum players reached. Transitioning to GAME_INIT.");
            }
            break;

            case GAME_INIT:
                //Waiting for data
                /* 
                storm.initializedZone();
                log.info("Storm initialized at ({}, {}) with radius {}", initialX, initialY, initialRadius);
                */

                // Reset all timers
                graceSeconds = 30;
                gracePeriodActive = true;
                matchTimer = 300;
                matchActive = true;
                shrinkIntervalSeconds = 45;  // or user-defined
                stormShrinkCountdown = shrinkIntervalSeconds;

                // Reset player health and storm status (if needed)
                for (Player player : lobby.getActivePlayers()) {
                    player.reset(); // implement a reset() method if not present
                }

                log.info("Game initialized. Moving to GAME_ONGOING state.");
                gameState = States.GAME_ONGOING;
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

                Iterator<Player> iterator = lobby.getActivePlayers().iterator();

                while (iterator.hasNext()) {
                    Player player = iterator.next();

                    storm.updateStormStatus(player);

                    if (player.isDead == true) {
                        log.info("{} has been eliminated.", player.user.getPlayerUUID());
                        iterator.remove(); // Safely remove while iterating
                    }
                }

                if (lobby.getActivePlayers().size() == 1) {
                    matchWinner = lobby.getActivePlayers().iterator().next();
                    gameState = States.GAME_RESULTS;
                }   

                break;

            case GAME_RESULTS:
                if (matchWinner != null) {
                    log.info("{} is the last player standing and wins the match!", matchWinner.user.getPlayerUUID());
                } else {
                    log.info("Match ended with no winner.");
                }
                matchActive = false;
                gracePeriodActive = true;
                graceSeconds = 30;
                matchTimer = 300;
                matchWinner = null;
                gameState = States.IDLE;
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
