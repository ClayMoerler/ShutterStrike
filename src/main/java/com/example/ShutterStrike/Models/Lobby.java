package com.example.ShutterStrike.Models;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class Lobby {
    
    // Lobby Constants
    private static final int MIN_PLAYERS_TO_START = 2;
    private static final int MAX_PLAYERS = 14;

    Player player = new Player();

    // Storing players. Key: PlayerId, Value: Player Obj
    private final Map<Long, Player> activePlayers = new ConcurrentHashMap<>();
    
    

    public boolean joinLobby(Player player){
        // Validation Checks
        if(activePlayers.size() >= MAX_PLAYERS) return false;
        
        if(activePlayers.containsKey(player.getPlayerUUID())) return false; //duplicate user 

        return true;
    }
    

}
