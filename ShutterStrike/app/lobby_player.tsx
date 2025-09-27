// file: components/MapComponent.tsx

import React from 'react';
import MapView, { Circle } from 'react-native-maps';
import { StyleSheet } from 'react-native';

// Define the center coordinates and radius for your circle
const circleDetails = {
  center: {
    latitude: 40.7128,  // Example: New York City
    longitude: -74.0060,
  },
  radius: 1500, // Radius in meters
};

export default function MapComponent() {
  return (
    <MapView
      style={styles.map}
      // Set the initial map view to be near your circle
      initialRegion={{
        ...circleDetails.center,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      {/* This component draws the circle directly on the map */}
      <Circle
        center={circleDetails.center}
        radius={circleDetails.radius}
        strokeWidth={3}
        strokeColor="red"
        fillColor="transparent" // Use transparent for no fill
      />
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});