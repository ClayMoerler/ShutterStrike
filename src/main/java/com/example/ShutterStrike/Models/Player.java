package com.example.ShutterStrike.Models;

import lombok.Getter;
import lombok.Setter;

public class Player{

    //Player Data
    @Setter
    @Getter
    private String playerName; 
    @Setter
    @Getter
    private String playerClass;
    @Setter
    @Getter
    private  int playerHealth;
    @Setter
    @Getter
    private boolean isHost;
    protected   User user;
    protected   StormStatus stormStatus;

    //Player Constructor
    private  Player(String playerName, String playerClass, int playerHealth, boolean isHost, User user, StormStatus stormStatus){
        this.playerName = playerName;
        this.playerClass = playerClass;
        this.playerHealth = playerHealth;
        this.isHost = isHost;
        this.user = user;
        this.stormStatus = stormStatus;
    }
    
    //Default Constructor
    public Player(){
        this(null,null,0,false,null,null);
    }

    public boolean isDead(){
        return this.playerHealth == 0;
    }

    public void heal(int amount) {
        this.playerHealth += amount;
    }

    public void damage(int amount) {
        this.playerHealth -= amount;
    }

    
}

