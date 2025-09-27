package com.example.ShutterStrike.Models;

import lombok.Getter;
import lombok.Setter;

public class Player{

    
    //Player Data
    @Setter
    @Getter
    private String playerUUID;
    private String playerName; 
    private String playerClass;
    private int playerHealth;
    private boolean isHost;

    User user = new User();

    // Nest player into User, because a lot of user data.

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

    public void takeDamage(){
        if(this.playerHealth > 0){
            this.playerHealth =- 1;
        }
        else{
            System.out.println("Player is dead");
        }
    }
    
    
}

