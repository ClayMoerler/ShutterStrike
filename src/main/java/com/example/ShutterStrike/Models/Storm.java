package com.example.ShutterStrike.Models;

import java.util.Random;

import org.springframework.stereotype.Component;

import com.example.ShutterStrike.Utilities.stormutil;

import lombok.Getter;
import lombok.Setter;

@Component
public class Storm {

    // Constants - Adjustable during trials
    private static final double SHRINK_AMOUNT = 10.0; // How much the radius shrinks per cycle
    private static final double SHRINK_FACTOR = 1.25; // Ratio of OuterRadius to NextRadius
    private static final double MIN_ZONE_RADIUS = 50.0; // Absolute smallest safe zone
    
    // Dependencies
    private final Random random = new Random();
    private stormutil stormUtilities; // for math
    //private final PlayerService playerService // will be for handling user damage in storm

    @Getter
    @Setter
    private double centerX;
    private double centerY;
    public double radius;
    private double nextRadius;
    
    private boolean initialized = false; // to prevent shrinking before use data arrives

    //Delete this after you read, crazy call from Gemini.
    //Create boolean to make sure we aren't calling for a storm without a lobby set up
    public void initializedZone(double centerX, double centerY, double radius, double nextRadius){
        if(!initialized){
        this.centerX = centerX;
        this.centerY = centerY;
        this.radius = radius;
        this.nextRadius = nextRadius;
        this.initialized = true;
        }
    }
    
    public void shrinkZone(){
        if (!initialized) {
            // Waiting on data, might remove
            return;
        }
        
        // 1. Calculate the new outer radius (The shrinking border)
        double newOuterRadius = this.radius - SHRINK_AMOUNT;
        newOuterRadius = Math.max(newOuterRadius, MIN_ZONE_RADIUS);
        
        // 2. Calculate the target radius for the inner safe zone (nextRadius)
        double newInnerRadius = newOuterRadius / SHRINK_FACTOR; 
        double potentialNewX;
        double potentialNewY;

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
        
        //System.out.println("Storm Shrunk! New Center: (" + this.centerX + ", " + this.centerY + "), New Radius: " + this.radius);
        
        // FUTURE STEP: Apply damage to players outside the new safe zone border
        // this.applyStormDamage(); 
    }  

}
