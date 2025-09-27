import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet } from 'react-native';

/**
 * A component that renders a full-screen map.
 * It's set to an initial location but can be customized.
 */
export default function MapComponent() {
  return (
    <MapView
      style={styles.map}
      // The initial region to display on the map
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      // You can customize map type, behavior, etc. here
      // For example: mapType="hybrid"
    >
      {/* You can add markers for specific points of interest */}
      <Marker
        coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
        title={"San Francisco"}
        description={"An initial marker."}
      />
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    // This style is crucial for making the map fill the entire background
    ...StyleSheet.absoluteFillObject,
  },
});
