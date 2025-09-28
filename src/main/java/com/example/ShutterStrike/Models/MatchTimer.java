package com.example.ShutterStrike.Models;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class MatchTimer {

    private final int matchDurationSeconds = 300;  // 5 minutes match
    private int remainingSeconds = matchDurationSeconds;
    private boolean matchActive = false;
    private long gracePeriodEndTime = 0;
    private boolean gracePeriodActive = false;

    public void startGracePeriod(){
        gracePeriodActive = true;
        gracePeriodEndTime = System.currentTimeMillis() + 30 * 1000L;
        log.info("Grace period started for {} seconds", 30);
    }

    @Scheduled(fixedRate = 500) // check twice a second for better responsiveness
    public void checkGracePeriod() {
        if (!gracePeriodActive) return;

        long now = System.currentTimeMillis();
        if (now >= gracePeriodEndTime) {
            gracePeriodActive = false;
            log.info("Grace period ended");
            startMatch();
    }
}

    public void startMatch() {
        if (!matchActive) {
            matchActive = true;
            remainingSeconds = matchDurationSeconds;
            log.info("Match started! Duration: {} seconds", matchDurationSeconds); // 5 min timer
        }
    }

    public void stopMatch() {
        matchActive = false;
        log.info("Match stopped manually.");
    }

    public boolean isMatchActive() {
        return matchActive;
    }

    public int getRemainingSeconds() {
        return remainingSeconds;
    }

    // Runs every second
    @Scheduled(fixedRate = 1000)
    public void tick() {
        if (!matchActive) return;

        if (remainingSeconds > 0) {
            remainingSeconds--;
            log.info("Match time remaining: {} seconds", remainingSeconds);
        } else {
            matchActive = false;
            log.info("Match ended!");
            // TODO: trigger end of match logic here (e.g., update game state)
        }
    }
}
