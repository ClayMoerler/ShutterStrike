package com.example.ShutterStrike.Models;

import lombok.Getter;
import lombok.Setter;

public class User {
    @Getter
    @Setter
    String faceMap; //Placeholder
    @Getter
    @Setter
    String playerUUID;

    public User(String playerUUID, String faceMap){
        this.playerUUID = playerUUID;
        this.faceMap = faceMap;
    }

    public User(){
        this(null,null);
    }



}
