import React, { useState, useRef } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import HorizontalScroller from '../components/HorizontalScroller';
import StyledButton from '../components/StyledButton';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
// Import the new component and its types
import InteractiveMap, { InteractiveMapRef, ZoneData } from '../components/InteractiveMap';

export default function LobbyScreen() {
  const router = useRouter();
  const interactiveMapRef = useRef<InteractiveMapRef>(null);
  
  const [savedZone, setSavedZone] = useState<ZoneData | null>(null);

  const handleSetZone = () => {
    const newZoneData = interactiveMapRef.current?.getCalculatedZone();
    if (newZoneData) {
      setSavedZone(newZoneData);
      
      // NEW: Print the captured zone data to the console
      console.log('Zone Data Set:', JSON.stringify(newZoneData, null, 2));

      Alert.alert(
        "Zone Set!",
        `The game zone is now locked to the area inside the red circle.`,
        [{ text: "OK" }]
      );
    } else {
      Alert.alert("Error", "Could not set zone. Try moving the map slightly first.");
    }
  };

  const handleStartGame = () => {
    if (!savedZone) {
      Alert.alert("Zone Not Set", "Please use the 'Set Zone' button before starting.");
      return;
    }
    
    const currentZone = interactiveMapRef.current?.getCalculatedZone();
    if (!currentZone) {
      Alert.alert("Map Error", "Could not read the current map position.");
      return;
    }

    const tolerance = 0.0001; 
    const isZoneUnchanged = 
      Math.abs(currentZone.center.latitude - savedZone.center.latitude) < tolerance &&
      Math.abs(currentZone.center.longitude - savedZone.center.longitude) < tolerance &&
      Math.abs(currentZone.radius - savedZone.radius) < 1.0;

    if (isZoneUnchanged) {
      router.push('/lobby_player');
    } else {
      Alert.alert(
        "Zone Mismatch",
        "The map has been moved since the zone was set. Please press 'Set Zone' again to confirm the new area."
      );
    }
  };

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
            onPress={handleSetZone}
            style={{ width: '35%' }}
          />
        </View>

      <InteractiveMap ref={interactiveMapRef} />

      <View style={styles.buttonContainer}>
          <StyledButton 
            title="Class" 
            onPress={() => router.push('/GameScreen_0')}  
            style={{ width: '47%' }}
          />
          <StyledButton 
            title="Start" 
            onPress={handleStartGame}  
            style={{ width: '47%' }}
          />
        </View>
    </SafeAreaView>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
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