package com.example.ShutterStrike.Models;

public class Player{

    //Player Data
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

    //Setters
    public void setPlayerName(String playerName){
        this.playerName = playerName;
    }
    public void setPlayerClass(String playerClass){
        this.playerClass = playerClass;
    }
    public void setPlayerID(int playerUUID){
        this.playerUUID = playerUUID;
    }
    public void setPlayerHealth(int playerHealth){
        this.playerHealth = playerHealth; 
    }
    public void setIsHost(boolean isHost){
        this.isHost = isHost; 
    }

    //Getters
    public String getPlayerName(String playerName){
        return playerName;
    }
    public String getPlayerClass(String playerClass){
        return playerClass;
    }
    public int getPlayerID(int playerUUID){
        return playerUUID;
    }
    public int getPlayerHealth(int playerHealth){
        return playerHealth;
    }
    public boolean getIsHost(boolean isHost){
        return isHost; 
    }

    public void takeDamage(int damage){
        this.playerHealth = this.playerHealth - 1;   
    }
}
