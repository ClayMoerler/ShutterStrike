    package com.example.ShutterStrike.Models;

    import java.util.Map;
    import java.util.concurrent.ConcurrentHashMap;

    public class Lobby {
        
        // Lobby Constants
        private static final int MIN_PLAYERS_TO_START = 2;
        private static final int MAX_PLAYERS = 14;

        Player player = new Player();

        int playerID = player.getPlayerUUID();
        
        // Storing players. Key: PlayerId, Value: Player Obj
        private final Map<Integer, Player> activePlayers = new ConcurrentHashMap<>();


        public boolean playerCount(){
            // Validation Checks
            return activePlayers.size() < MAX_PLAYERS;
        }

        public boolean lobbyValidation(){
            return MIN_PLAYERS_TO_START >= 2 && playerCount();
        }



        

    }
