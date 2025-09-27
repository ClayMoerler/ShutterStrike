package com.example.ShutterStrike.Models;

import lombok.Getter;
import lombok.Setter;
//import lombok.NoArgsConstructor;

public class Player{

    
    //Player Data
    @Setter
    @Getter
    //@NoArgsConstructor
    private String playerName; 
    private String playerClass;
    private int playerUUID;
    private int playerHealth;
    private boolean isHost;

    // Nest player into User, because a lot of user data.

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

    

    /*public void takeDamage(){
        if(this.playerHealth > 0){
            this.playerHealth =- 1;
        }
        else{
            System.out.println("Player is dead");
        }
        */
    
}

