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
    private  int playerHealth;
    @Setter
    @Getter
    private boolean isHost;
    @Setter
    @Getter
    private User user;
    @Setter
    @Getter
    private double longitude;
    @Setter
    @Getter
    private double latitude;
    @Setter
    @Getter
    private boolean inStorm;
    @Setter
    @Getter
    private double stormEntryTime = 0;

    //Player Constructor
    private  Player(String playerName, String playerClass, String playerUUID, int playerHealth, boolean isHost, 
                    double longitude, double latitude, boolean inStorm, double stormEntryTime){
        this.playerName = playerName;
        this.playerClass = playerClass;
        this.playerUUID = playerUUID;
        this.playerHealth = playerHealth;
        this.isHost = isHost;
        this.longitude = longitude;
        this.latitude = latitude;
        this.inStorm = inStorm;
        this.stormEntryTime = stormEntryTime;
    }
    
    //Default Constructor
    public Player(){
        this(null,null,null,0,false, 0,0,false,0);
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

