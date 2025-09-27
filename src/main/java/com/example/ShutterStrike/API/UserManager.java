package com.example.ShutterStrike.API;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.http.HttpResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.example.ShutterStrike.Models.User;
import com.example.ShutterStrike.GameStateMachine.StateMachine;
import com.example.ShutterStrike.GameStateMachine.StateMachine.States;

import lombok.extern.slf4j.Slf4j;


@RestController
@Slf4j
@RequestMapping("/api/player/user")
public class UserManager {

    private final StateMachine stateMachine;
    public UserManager(StateMachine stateMachine) {
        this.stateMachine = stateMachine;
    }
     
    @PostMapping
    public ResponseEntity<String> receiveUserData(@RequestBody User user) {
        log.info("Received new user: {}", user.toString());

        if(stateMachine.gameState == States.IDLE) {
            log.info("Player {} connected during IDLE state. Rejecting.", user.getUUID());
            return ResponseEntity
                .status(406)
                .body("Player " + user.getUUID() + " connected during IDLE state. Rejecting");
        }

        log.info("Saving player {}", user.getUUID());
        return ResponseEntity
            .status(200)
            .body("Success");
    }
}
