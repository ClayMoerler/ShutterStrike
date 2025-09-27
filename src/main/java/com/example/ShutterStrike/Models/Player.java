package com.example.ShutterStrike.Models;

public class Player {

    //Player Data
    private String playerName; 
    private String playerClass;
    private int playerID;
    private int playerHealth;

    //Player Constructor
    public Player(String playerName, String playerClass, int playerID, int playerHealth){
        this.playerName = playerName;
        this.playerClass = playerClass;
        this.playerID = playerID;
        this.playerHealth = playerHealth;
    }
    
    //Default Constructor
    public Player(){
        this(null,null,0,0);
    }

    //Setters
    public void setPlayerName(String playerName){
        this.playerName = playerName;
    }
    public void setPlayerClass(String playerClass){
        this.playerClass = playerClass;
    }
    public void setPlayerID(int playerID){
        this.playerID = playerID;
    }
    public void setPlayerHealth(int playerHealth){
        this.playerHealth = playerHealth;
    }

    //Getters
    public String getPlayerName(String playerName){
        return playerName;
    }
    public String getPlayerClass(String playerClass){
        return playerClass;
    }
    public int getPlayerID(int playerID){
        return playerID;
    }
    public int getPlayerHealth(int playerHealth){
        return playerHealth;
    }
}
