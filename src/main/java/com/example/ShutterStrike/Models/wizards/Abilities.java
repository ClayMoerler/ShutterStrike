package com.example.ShutterStrike.Models.wizards;

public interface Abilities {
         
    final int START_HEALTH = 3;
    static final float COOLDOWN_SECONDS = 15.0F;

    public boolean isReady();
    
}
