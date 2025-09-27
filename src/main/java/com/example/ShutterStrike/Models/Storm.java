package com.example.ShutterStrike.Models;

import java.util.Random;

import org.springframework.scheduling.annotation.Scheduled;

import lombok.Getter;
import lombok.Setter;

public class Storm {
    @Getter
    @Setter
    private double centerX;
    private double centerY;
    private double radius;
    private double nextRadius;
    private double shrinkTimer;

    private final Random random = new Random();

    public Storm(double centerX, double centerY, double radius){
        this.centerX = centerX;
        this.centerY = centerY;
        this.radius = radius;
    }

    @Scheduled(fixedRate = 30000)
    public void shrinkZone(){
        
    }
    



}
