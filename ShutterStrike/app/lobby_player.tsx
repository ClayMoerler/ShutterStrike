import React, { useEffect, useState } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import HorizontalScroller from '../components/HorizontalScroller';
import StyledButton from '../components/StyledButton';
import { useRouter } from 'expo-router'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import ZonedMapComponent from '../components/ZonedMapComponent';
import * as Location from 'expo-location';

type GameZone = {
  center: { latitude: number; longitude: number };
  radius: number;
};

export default function LobbyPlayerScreen() {
  const router = useRouter();
  const [gameZone, setGameZone] = useState<GameZone | null>(null);

  useEffect(() => {
    const initLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.warn('Permission denied for location');
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setGameZone({
        center: {
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        },
        radius: 500, // default radius until server sends real zone
      });
    };

    initLocation();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <HorizontalScroller />

      <View style={styles.buttonContainer}>
        <StyledButton 
          title="Options" 
          onPress={() => alert('Options!')}  
          style={{ width: '47%' }}
        />
        <StyledButton 
          title="Class" 
          onPress={() => alert('Class selected!')}  
          style={{ width: '47%' }}
        />
      </View>

      <View style={styles.mapContainer}>
        {gameZone && (
          <ZonedMapComponent 
            zoneCenter={gameZone.center}
            zoneRadius={gameZone.radius}
          />
        )}
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
