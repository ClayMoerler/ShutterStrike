package com.example.ShutterStrike.Models;

import lombok.Getter;
import lombok.Setter;


public class StormStatus {
    @Getter
    @Setter
    private double longitude;
    @Getter
    @Setter
    private double latitude;
    @Setter
    private boolean inStorm;
    @Getter
    @Setter
    private double stormEntryTime;
    

    public StormStatus(double longitude, double latitude, boolean inStorm, double stormEntryTime) {
        this.longitude = longitude;
        this.latitude = latitude;
        this.inStorm = inStorm;
        this.stormEntryTime = stormEntryTime;
    }

    public boolean isInStorm() {
        return inStorm;
    }
}
