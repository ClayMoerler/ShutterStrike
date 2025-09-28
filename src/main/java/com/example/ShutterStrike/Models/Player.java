package com.example.ShutterStrike.Models;

import lombok.Getter;
import lombok.Setter;

public class Player{

    //Player Data
    @Setter
    @Getter
    private String playerClass;
    @Setter
    @Getter
    private  int playerHealth;
    @Setter
    @Getter
    private boolean isHost;
    public User user;
    @Setter
    @Getter
    public StormStatus stormStatus;
    
    public boolean isDead = false;

    //Player Constructor
    private  Player(String playerClass, int playerHealth, boolean isHost, User user, StormStatus stormStatus,boolean isDead){
        this.playerClass = playerClass;
        this.playerHealth = playerHealth;
        this.isHost = isHost;
        this.user = user;
        this.stormStatus = stormStatus;
        this.isDead = isDead;
    }
    
    //Default Constructor
    public Player(){
        this(null,0,false,null,null,false);
    }

    public void heal(int amount) {
        this.playerHealth += amount;
    }

    public void damage(int amount) {
        this.playerHealth -= amount;
    }

    public void reset() {
        this.playerHealth = 3;
        isDead = false;
        this.playerClass = null;


        if (this.stormStatus != null) {
            this.stormStatus.setInStorm(false);
            this.stormStatus.setStormEntryTime(0.0);
        }

        // Optionally reset position, if relevant
        this.stormStatus.setLatitude(0.0);
        this.stormStatus.setLongitude(0.0);

    }

    
}

