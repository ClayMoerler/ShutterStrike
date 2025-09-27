package com.example.ShutterStrike.API;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import com.example.ShutterStrike.GameStateMachine.StateMachine;

@RestController
public class GameController {
    
    private final StateMachine stateMachine;
     
    public GameController(StateMachine stateMachine) {
        this.stateMachine = stateMachine;
    }

    @PostMapping("api/game/start")
    public ResponseEntity<String> processInitLobbyRequest(@RequestBody String singal) {
        stateMachine.initLobby();
        return ResponseEntity.ok("Event received");
    }

}
