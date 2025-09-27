import React from 'react';
import { Text, View, StyleSheet, StatusBar } from 'react-native';
import HorizontalScroller from '../components/HorizontalScroller';
import MapComponent from '../components/MapComponent';
import StyledButton from '../components/StyledButton';
import { useRouter } from 'expo-router'; 
import { SafeAreaView } from 'react-native-safe-area-context'



export default function LobbyScreen() {
    const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <HorizontalScroller />
   
      <View style={styles.buttonContainer}>
          <StyledButton 
            title="Game Options" 
            onPress={() => router.push('/lobby_player')}  
            style={{ width: '60%' }}
          />
          <StyledButton 
            title="Set Zone" 
            onPress={() => router.push('/lobby_player')}  
            style={{ width: '35%' }}
          />
        </View>

      <View style={styles.mapContainer}>
        <MapComponent />
        
        <View style={styles.invertedCircleOverlay} pointerEvents="none" />

        <View style={styles.circleBorder} pointerEvents="none" />
      </View>

      <View style={styles.buttonContainer}>
          <StyledButton 
            title="Class" 
            onPress={() => router.push('/lobby_player')}  
            style={{ width: '47%' }}
          />
          <StyledButton 
            title="Start" 
            onPress={() => router.push('/lobby_player')}  
            style={{ width: '47%' }}
          />
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
  },
  mapContainer: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 12,
    overflow: 'hidden', 
    justifyContent: 'center',
    alignItems: 'center',
  },
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

