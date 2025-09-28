package com.example.ShutterStrike.Models;

import lombok.Getter;
import lombok.Setter;

public class Player{
    

    //Player Data
    @Setter
    @Getter
    private String playerUUID;
    @Setter
    @Getter
    private String playerName; 
    @Setter
    @Getter
    private String playerClass;
    @Setter
    @Getter
    private int playerHealth;
    @Setter
    @Getter
    private boolean isHost;
    @Setter
    @Getter
    private User user;

    //Player Constructor
    public Player(String playerName, String playerClass, String playerUUID, int playerHealth, boolean isHost, User user){
        this.playerName = playerName;
        this.playerClass = playerClass;
        this.playerUUID = playerUUID;
        this.playerHealth = playerHealth;
        this.isHost = isHost;
        this.user = user;
    }
    
    //Default Constructor
    public Player(){
        this(null,null,null,0,false, null);
    }

    public void takeDamage(int damage){
        if(this.playerHealth > 0){
            playerHealth = playerHealth - damage;
        }

        if(playerHealth < 0){
            playerHealth = 0; // Just in case
        }
    }

    public boolean isDead(){
        return this.playerHealth == 0;
    }
    
}

