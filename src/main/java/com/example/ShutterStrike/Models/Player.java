package com.example.ShutterStrike.Models;

import lombok.Getter;
import lombok.Setter;

public class Player{

    
    //Player Data
    @Setter
    @Getter
    private String playerName; 
    private String playerClass;
    private int playerUUID;
    private int playerHealth;
    private boolean isHost;

    //Player Constructor
    public Player(String playerName, String playerClass, int playerUUID, int playerHealth, boolean isHost){
        this.playerName = playerName;
        this.playerClass = playerClass;
        this.playerUUID = playerUUID;
        this.playerHealth = playerHealth;
        this.isHost = isHost;
    }
    
    //Default Constructor
    public Player(){
        this(null,null,0,0,false);

    }
}

