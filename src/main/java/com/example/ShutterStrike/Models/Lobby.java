    package com.example.ShutterStrike.Models;

    import java.util.Map;
    import java.util.concurrent.ConcurrentHashMap;
    import java.util.logging.Level;
    import java.util.logging.Logger;
    
    import com.example.ShutterStrike.Models.wizards.Enchanter;


    public class Lobby {
        
        // Lobby Constants
        private static final int MIN_PLAYERS_TO_START = 2;
        private static final int MAX_PLAYERS = 14;

        private static final Logger logger = Logger.getLogger(null);

        private Player player;
        
        // Storing players. Key: PlayerId, Value: Player Obj
        private final Map<String, Player> activePlayers = new ConcurrentHashMap<>();
        
        public boolean addPlayer(Player player){
            if(activePlayers.size() < MAX_PLAYERS){
            this.player = player;
            activePlayers.put(player.getPlayerUUID(), player);
            playerCount();
            return true;
            }
            else{
                logger.log(null, "Max player limit is reached.");
                return false;    
            }
        }

        /* 
        public void removePlayer(){
            if(!playerConnected){
                activePlayers.remove(player.getPlayerUUID());
            }    
        }
        */


        public int playerCount(){
            return activePlayers.size();
        }

        public boolean lobbyValidation(){
            return MIN_PLAYERS_TO_START >= 2;
        }       

    }
