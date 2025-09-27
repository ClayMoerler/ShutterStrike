package com.example.ShutterStrike.Models;
import lombok.Data;

@Data
public class User {
    String UUID;
    String faceMap; //Placeholder
    Player player;

    public User(Player player, String UUID, String faceMap){
        this.player = player;
        this.UUID = UUID;
        this.faceMap = faceMap;
    }

    public User(){
        this(null,null,null);
    }



}
