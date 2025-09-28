    package com.example.ShutterStrike.Models;

    import java.util.Collection;
    import java.util.Map;
    import java.util.concurrent.ConcurrentHashMap;

    import org.springframework.stereotype.Service;

    import com.example.ShutterStrike.Constants.Constants;

    import lombok.extern.slf4j.Slf4j;

    @Slf4j
    @Service
    public class Lobby {
        
        // Lobby Constants
        protected Player player;
        
        
        // Storing players. Key: PlayerId, Value: Player Obj
        private final Map<String, Player> activePlayers = new ConcurrentHashMap<>();
        
        public Collection<Player> getActivePlayers() {
        return activePlayers.values();
        }

        public boolean addPlayer(Player player){
            if(activePlayers.size() < Constants.MAX_PLAYERS){
            this.player = player;
            activePlayers.put(player.user.getPlayerUUID(), player);
            playerCount();
            return true;
            }
            else{
                log.info("Max player limit is reached.");
                return false;    
            }
        }

        public void removePlayer(String playerUUID) {
            Player removed = activePlayers.remove(playerUUID);
            if (removed != null) {
                System.out.println(removed.getPlayerName() + " has left the lobby.");
            } else {
                System.out.println("No player found with UUID: " + playerUUID);
            }
        }       

        public int playerCount(){
            return activePlayers.size();
        }

        public boolean lobbyValidation(){
            return playerCount() < 14 && playerCount() > Constants.MIN_PLAYERS_TO_START;
        }       

    }
