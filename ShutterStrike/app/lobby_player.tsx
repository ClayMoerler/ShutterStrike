import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import HorizontalScroller from '../components/HorizontalScroller';
import StyledButton from '../components/StyledButton';
import { useRouter } from 'expo-router'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import ZonedMapComponent from '../components/ZonedMapComponent'; // Import the new component

const GAME_ZONE = {
  center: {
    latitude: 20.638553832144332,
    longitude: -76.32894225418568,
  },
  radius: 63279.22279608262, // in meters
};

export default function LobbyPlayerScreen() {
    const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <HorizontalScroller />

<View style={styles.buttonContainer}>
            <StyledButton 
            title="Options" 
            onPress={() => alert('Ready!')}  
            style={{ width: '47%' }}
          />
</View>

      <View style={styles.mapContainer}>
        <ZonedMapComponent 
          zoneCenter={GAME_ZONE.center}
          zoneRadius={GAME_ZONE.radius}
        />
      </View>

      <View style={styles.buttonContainer}>
          <StyledButton 
            title="Class" 
            onPress={() => alert('Class selected!')}  
            style={{ width: '47%' }}
          />
          <StyledButton 
            title="Ready" 
            onPress={() => alert('Ready!')}  
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
    gap: 15,
    paddingBottom: 15,
  },
  mapContainer: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 12,
    overflow: 'hidden',
  },
  buttonContainer: {
    flexDirection: 'row', 
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
});