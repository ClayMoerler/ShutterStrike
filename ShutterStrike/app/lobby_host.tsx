import React from 'react';
import { Text, View, StyleSheet, StatusBar } from 'react-native';
import HorizontalScroller from '../components/HorizontalScroller';
import MapComponent from '../components/MapComponent';
import StyledButton from '../components/StyledButton';
import { useRouter } from 'expo-router'; 

export default function LobbyScreen() {
    const router = useRouter();
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <HorizontalScroller />
   
      <View style={styles.buttonContainer}>
          <StyledButton 
            title="Game Options" 
            onPress={() => router.push('/lobby_player')}  
            style={{ width: '65%' }}
          />
          <StyledButton 
            title="Go" 
            onPress={() => router.push('/lobby_player')}  
            style={{ width: '30%' }}
          />
        </View>

      <View style={styles.mapContainer}>
        <MapComponent />
        
        {/* This View creates the shading OUTSIDE the circle */}
        <View style={styles.invertedCircleOverlay} pointerEvents="none" />

        {/* This View adds the solid red border back */}
        <View style={styles.circleBorder} pointerEvents="none" />
      </View>

      <View style={styles.buttonContainer}>
          <StyledButton 
            title="Go" 
            onPress={() => router.push('/lobby_player')}  
            style={{ width: '47%' }}
          />
          <StyledButton 
            title="Go" 
            onPress={() => router.push('/lobby_player')}  
            style={{ width: '47%' }}
          />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
  },
  mapContainer: {
    height: 250,
    width: '90%',
    alignSelf: 'center',
    marginVertical: 20,
    borderRadius: 12,
    // overflow: 'hidden' is crucial for this technique to work
    overflow: 'hidden', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  // --- NEW STYLES ---
  invertedCircleOverlay: {
    position: 'absolute',
    width: 2000,  // A very large width
    height: 2000, // A very large height
    borderRadius: 1000, // Makes it a circle (half of width/height)
    // This creates the transparent "hole" in the middle
    borderWidth: 900, // (width / 2) - (hole_radius) = 1000 - 100 = 900
    borderColor: 'rgba(255, 0, 0, 0.4)', // The semi-transparent red for shading
  },
  circleBorder: {
    position: 'absolute',
    width: 200,      // Same size as the transparent hole
    height: 200,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: 'red', // The solid red border
  },
  // --- END NEW STYLES ---
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 24,
  },
  buttonContainer: {
    flexDirection: 'row', 
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center', 
    justifyContent: 'space-between',
    marginVertical: 10,
  },
});