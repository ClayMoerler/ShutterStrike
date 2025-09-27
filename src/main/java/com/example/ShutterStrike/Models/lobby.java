package com.example.ShutterStrike.Models;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class lobby {
    // Unique lobby identifier 
    private String matchID; // will be given from danny 
    private static final int MIN_PLAYERS_TO_START = 2;
    private static final int MAX_PLAYERS = 14;

    // Storing players. Key: PlayerId, Value: Player Obj
    private final Map<Long, Player> activePlayers = new ConcurrentHashMap<>();
    
    //public StateMachine waiting = StateMachine.AWAITING_PLAYERS; this wont work

}
