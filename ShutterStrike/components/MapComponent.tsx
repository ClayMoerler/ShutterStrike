import React from 'react';
import MapView, { Region } from 'react-native-maps';
import { StyleSheet } from 'react-native';

// Define the props for the component
type MapComponentProps = {
  onRegionChange: (region: Region) => void;
};

/**
 * A component that renders a map and reports its region changes.
 */
export default function MapComponent({ onRegionChange }: MapComponentProps) {
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      onRegionChangeComplete={onRegionChange}
      showsMyLocationButton={false} // 👈 hides the default button
    />
  );
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
