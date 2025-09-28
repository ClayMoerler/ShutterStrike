package com.example.ShutterStrike.Models.wizards;

import com.example.ShutterStrike.Models.Player;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class Cleric extends Wizards{

    private boolean isBoosted = false;
    private double boostStartTime;
    private Player player;
    private final double BOOST_DURATION = 30.0;
    private final int tempBoostAmount = 1;
    private final int preBoostHealth = 0;
    
    public Cleric(Player player) {
            super(1, 60,player); 
        }
    @Override
    public void useAbility() {
        if (isReady()) {
            tempHeal();
            log.info("Cleric ability used");
            super.useAbility();
        } else {
            log.info("Cleric's ability on cd");
        }
    }

    public void tempHeal() {
    if (!isBoosted) {
        player.heal(1); // boosts health
        isBoosted = true;
        boostStartTime = System.currentTimeMillis() / 1000.0;
        log.info("Cleric temporarily healed for 1 HP");
    } else {
        log.info("Heal is already active");
    }
}

public void updateBoostStatus() {
    if (isBoosted) {
        double currentTime = System.currentTimeMillis() / 1000.0;
        
        if ((currentTime - boostStartTime) >= BOOST_DURATION) {
            int currentHealth = player.getPlayerHealth();
            int boostRemaining = currentHealth - preBoostHealth;

            if (boostRemaining > 0) {
                // Only remove the *remaining* temp health
                player.heal(-Math.min(boostRemaining, tempBoostAmount));
                log.info("Temporary heal expired, {} HP removed", Math.min(boostRemaining, tempBoostAmount));
            } else {
                log.info("Temporary heal expired, but HP already lost in battle.");
            }

            isBoosted = false;
        }
    }
}
        
    @Override
    public void attack(Player target){
        super.attack(target);
        target.damage(this.damage);
    }
}    

