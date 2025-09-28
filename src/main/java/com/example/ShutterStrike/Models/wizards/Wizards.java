package com.example.ShutterStrike.Models.wizards;

import java.util.logging.Level;
import java.util.logging.Logger;

import com.example.ShutterStrike.Models.Player;

public abstract class Wizards {

    private static final Logger logger = Logger.getLogger(Wizards.class.getName());
    protected final Player player;
    private double lastUsedTime;
    protected final int startHealth;
    protected final double COOLDOWN_SECONDS = 15;
    protected int damage = 1;

    public Wizards(int startHealth, int damage, Player player) {
        this.startHealth = startHealth;
        this.damage = damage;
        this.lastUsedTime = 0.0;
        this.player = player;
    }

    public boolean isReady() {
        double currentTime = System.currentTimeMillis() / 1000.0;
        return (currentTime - lastUsedTime) >= COOLDOWN_SECONDS;
    }

    public void useAbility(){
        if(isReady()){
        lastUsedTime = System.currentTimeMillis() / 1000.0;
        logger.info("Ability used.");
        }
        else{
            logger.info("Ability not ready.");
        }
        
    }


// FIller till we integrate camera
    public void attack(){
        logger.log(Level.INFO, "{0} attacks", player.getPlayerName());
    }
    
}
