    package com.example.ShutterStrike.Models.wizards;

    import java.util.logging.Level;
    import java.util.logging.Logger;

    import com.example.ShutterStrike.Models.Player;

    public class Enchanter extends Wizards {

        boolean isBoosted = false;
        double boostStartTime;
        final double BOOST_DURATION = 5.0;
        private static final Logger logger = Logger.getLogger(Enchanter.class.getName());

        public Enchanter(Player player) {
            super(3, 1, player); 
        }

        @Override
        public void useAbility() {
            if (isReady()) {
                dmgBoost();
                logger.info("Enchanter ability used");
                super.useAbility();
            } else {
                logger.info("Enchanter's ability on cd");
            }
        }

        public void dmgBoost() {
        if (!isBoosted) {
            this.damage += 1;
            this.isBoosted = true;
            boostStartTime = System.currentTimeMillis() / 1000.0;
            logger.log(Level.INFO, "{0} damage boosted to {1}", new Object[]{player.getPlayerName(), this.damage});
        } else {
            logger.info("Damage is already boosted.");
            }
        }

        public void updateBoostStatus() {
        if (isBoosted) {
            double currentTime = System.currentTimeMillis() / 1000.0;
            if ((currentTime - boostStartTime) >= BOOST_DURATION)    {
                this.damage -= 1;
                this.isBoosted = false;
                logger.log(Level.INFO, "{0}''s damage boost expired. Damage is now {1}", new Object[]{player.getPlayerName(), this.damage});
                }
            }
        }

        @Override
        public void attack(){
            updateBoostStatus();
            super.attack();
        }
        
    }