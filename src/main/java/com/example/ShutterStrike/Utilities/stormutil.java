package com.example.ShutterStrike.Utilities;

import org.springframework.stereotype.Component;    

@Component
public class stormutil {

public static boolean isContainmentValid(double oldX, double oldY, double oldRadius, double newX, double newY, double newInnerRadius) {
        // 1. Calculate the distance (D) between the two centers
        // D = sqrt((x2 - x1)^2 + (y2 - y1)^2)
        double distanceBetweenCenters = Math.sqrt(Math.pow(newX - oldX, 2) + Math.pow(newY - oldY, 2));
        // 2. Check the containment rule
        return (distanceBetweenCenters + newInnerRadius) <= oldRadius;
    }
}