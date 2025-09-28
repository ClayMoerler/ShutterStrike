import React, { useEffect, useState } from 'react';
import MapView, { Region } from 'react-native-maps';
import { StyleSheet } from 'react-native';
import * as Location from 'expo-location';

type MapComponentProps = {
  onRegionChange: (region: Region) => void;
};

export default function MapComponent({ onRegionChange }: MapComponentProps) {
  const [initialRegion, setInitialRegion] = useState<Region | null>(null);

  useEffect(() => {
    const getLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.warn('Permission to access location was denied');
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setInitialRegion({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.01,   // tighter zoom than default
        longitudeDelta: 0.01,
      });
    };

    getLocation();
  }, []);

  if (!initialRegion) {
    // Optionally render a loading state or blank map until we have location
    return null;
  }

  return (
    <MapView
      style={styles.map}
      initialRegion={initialRegion}
      onRegionChangeComplete={onRegionChange}
      showsUserLocation={true}      // ✅ show blue dot for user
      showsMyLocationButton={false} // ✅ removed center map icon
    />
  );
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
