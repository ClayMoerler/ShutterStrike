    package com.example.ShutterStrike.Models.wizards;

    import com.example.ShutterStrike.Models.Player;

    import lombok.extern.slf4j.Slf4j;

    @Slf4j
    public class Enchanter extends Wizards {

        boolean isBoosted = false;
        double boostStartTime;
        final double BOOST_DURATION = 15.0;
        protected final double COOLDOWN_SECONDS = 15;

        public Enchanter(Player player) {
            super(1, 30 ,player); 
        }

        @Override
        public void useAbility() {
            if (isReady()) {
                dmgBoost();
                log.info("Enchanter ability used");
                super.useAbility();
            } else {
                log.info("Enchanter's ability on cd");
            }
        }

        public void dmgBoost() {
        if (!isBoosted) {
            this.damage += 1;
            this.isBoosted = true;
            boostStartTime = System.currentTimeMillis() / 1000.0;
            log.info("Boosted");
        } else {
            log.info("Damage is already boosted.");
            }
        }

        public void updateBoostStatus() {
        if (isBoosted) {
            double currentTime = System.currentTimeMillis() / 1000.0;
            if ((currentTime - boostStartTime) >= BOOST_DURATION)    {
                this.damage -= 1;
                this.isBoosted = false;
                log.info("DMG Boost Expired");
                }
            }
        }

        @Override
        public void attack(Player target){
            super.attack(target);
            target.damage(this.damage);
        }
        
    }