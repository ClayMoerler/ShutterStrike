package com.example.ShutterStrike.Models;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.example.ShutterStrike.StateMachine.StateMachine;

public class Lobby {
    // Unique lobby identifier  
    private static final int MIN_PLAYERS_TO_START = 2;
    private static final int MAX_PLAYERS = 14;

    User player = new User();

    // Storing players. Key: PlayerId, Value: Player Obj
    private final Map<Long, Player> activePlayers = new ConcurrentHashMap<>();
    
    public StateMachine waiting = StateMachine.AWAITING_PLAYERS;

    public boolean joinLobby(Player player){
        // Validation Checks
        if(waiting != StateMachine.AWAITING_PLAYERS || activePlayers.size() >= MAX_PLAYERS) return false;
        // if(player.getID() == null) return false; // no user ID
        
        return true;
        
    }
    

}
