package com.example.ShutterStrike.Models.wizards;

import com.example.ShutterStrike.Models.Player;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public abstract class Wizards {

    private final Player player;
    private double lastUsedTime;
    protected double cooldownSeconds;
    protected int damage;

    public Wizards(int damage, double cooldownSeconds, Player player) {
        this.damage = damage;
        this.cooldownSeconds = cooldownSeconds;
        this.lastUsedTime = 0.0;
        this.player = player;
    }

    public boolean isReady() {
        double currentTime = System.currentTimeMillis() / 1000.0;
        return (currentTime - lastUsedTime) >= cooldownSeconds;
    }

    public void useAbility() {
        if (isReady()) {
            lastUsedTime = System.currentTimeMillis() / 1000.0;
            log.info("Ability used.");
        } else {
            log.info("Ability not ready. Cooldown remaining: {}s", 
                cooldownSeconds - (System.currentTimeMillis() / 1000.0 - lastUsedTime));
        }
    }

    public void attack(Player target) { 
        log.info(player.getPlayerName() + " attacks " + target.getPlayerName());
    
    // Damage the target
    target.damage(this.damage); 
    }   
}