package com.example.ShutterStrike.Models;
import lombok.Data;

@Data
public class User {
    String faceMap; //Placeholder
    String UUID;

    public User(String UUID, String faceMap){
        this.UUID = UUID;
        this.faceMap = faceMap;
    }

    public User(){
        this(null,null);
    }



}
