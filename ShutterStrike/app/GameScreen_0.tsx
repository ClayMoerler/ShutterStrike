import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import StyledButton from '../components/StyledButton';
import ZonedMapComponent from '../components/ZonedMapComponent';
import GameBanner from '../components/GameBanner'; // 👈 import new component

const GAME_ZONE = {
  center: {
    latitude: 20.638553832144332,
    longitude: -76.32894225418568,
  },
  radius: 63279.22279608262, // in meters
};

export default function GameScreen_0() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mapContainer}>
        <ZonedMapComponent 
          zoneCenter={GAME_ZONE.center}
          zoneRadius={GAME_ZONE.radius}
        />

      {/* HUD Overlay */}
      <GameBanner 
        lives={3} 
        maxLives={5} 
        gameTimer={60} 
        active={true} 
      />

      </View>


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // black background behind map
  },
  mapContainer: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    borderRadius: 12,
    overflow: 'hidden',
  },
});
