package com.example.ShutterStrike.Models;

import java.util.Random;

import org.springframework.stereotype.Component;

import com.example.ShutterStrike.Utilities.stormutil;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class Storm {

    // Constants - Adjustable during trials
    private static final double SHRINK_AMOUNT = 10.0; // How much the radius shrinks per cycle
    private static final double SHRINK_FACTOR = 1.25; // Ratio of OuterRadius to NextRadius
    private static final double MIN_ZONE_RADIUS = 50.0; // Absolute smallest safe zone
    private static final int STORM_SHRINK_INTERVAL = 30; // seconds
    
    // Dependencies
    private final Random random = new Random();
    protected stormutil stormUtilities; // for math
    private double centerX;
    private double centerY;
    public double radius;
    protected  double nextRadius;
    private double lastShrinkTime = 0;
    protected Player player;
    
    private boolean initialized = false; // to prevent shrinking before use data arrives

    //Delete this after you read, crazy call from Gemini.
    //Create boolean to make sure we aren't calling for a storm without a lobby set up
    public void initializedZone(double centerX, double centerY, double radius, double nextRadius){
        if(!initialized){
        this.centerX= centerX;
        this.centerY = centerY;
        this.radius = radius;
        this.nextRadius = nextRadius;
        this.initialized = true;
        }
    }
    
    public void updateStormStatus(Player player) {
    double playerX = player.stormStatus.getLongitude();
    double playerY = player.stormStatus.getLatitude();
    
    double distanceFromCenter = Math.sqrt(Math.pow(playerX - centerX, 2) + Math.pow(playerY - centerY, 2));
    
    boolean isCurrentlyInStorm = distanceFromCenter > radius;

    double currentTime = System.currentTimeMillis() / 1000.0; // seconds

    if (isCurrentlyInStorm) {
        if (!player.stormStatus.isInStorm()) {
            player.stormStatus.setInStorm(true);
            player.stormStatus.setStormEntryTime(currentTime);
            log.info("{} entered the storm!", player.getPlayerName());
        } else {
            // Already in storm, calculate time
            double timeInStorm = currentTime - player.stormStatus.getStormEntryTime();
            int damageInterval = 10;
            int damage = 1;

            if ((int) timeInStorm % damageInterval == 0) {
                player.damage(damage);
                log.info("{} takes {} storm damage. Current HP: {}", player.getPlayerName(), damage, player.getPlayerHealth());
            }
        }
    } else {
        if (player.stormStatus.isInStorm()) {
            player.stormStatus.setInStorm(false);
            player.stormStatus.setStormEntryTime(0.0);
            log.info("{} escaped the storm!", player.getPlayerName());
        }
    }
}

    public void shrinkZoneIfReady() {
        if (!initialized) return;

        double currentTime = System.currentTimeMillis() / 1000.0;
        if ((currentTime - lastShrinkTime) < STORM_SHRINK_INTERVAL) {
            return; // Not time to shrink yet
        }

        double newOuterRadius = Math.max(this.radius - SHRINK_AMOUNT, MIN_ZONE_RADIUS);
        double newInnerRadius = newOuterRadius / SHRINK_FACTOR;

        double potentialNewX, potentialNewY;

        while (true) {
            double maxShift = newOuterRadius - newInnerRadius;
            double deltaX = random.nextDouble() * 2 * maxShift - maxShift;
            double deltaY = random.nextDouble() * 2 * maxShift - maxShift;

            potentialNewX = this.centerX + deltaX;
            potentialNewY = this.centerY + deltaY;

            if (stormutil.isContainmentValid(this.centerX, this.centerY, this.radius, potentialNewX, potentialNewY, newInnerRadius)) {
                this.centerX = potentialNewX;
                this.centerY = potentialNewY;
                this.radius = newOuterRadius;
                this.nextRadius = newInnerRadius;
                this.lastShrinkTime = currentTime;
                log.info("Storm shrunk: New center=({}, {}), Radius={}", centerX, centerY, radius);
                break;
            }
        }
        
        // Loop until a valid, contained new center is found.
        while (true) {
            
            double maxShift = newOuterRadius - newInnerRadius;

            double deltaX = random.nextDouble() * 2 * maxShift - maxShift; 
            double deltaY = random.nextDouble() * 2 * maxShift - maxShift; 

            potentialNewX = this.centerX + deltaX;
            potentialNewY = this.centerY + deltaY;
            
            if (stormutil.isContainmentValid(this.centerX, this.centerY, this.radius, potentialNewX, potentialNewY, newInnerRadius)) {
                
                this.centerX = potentialNewX;
                this.centerY = potentialNewY;
                this.radius = newOuterRadius;
                this.nextRadius = newInnerRadius; 
                break;
            }
        }
    }

}
