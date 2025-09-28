import React, { useState, useCallback, useRef, forwardRef, useImperativeHandle } from 'react';
import { View, StyleSheet, LayoutChangeEvent } from 'react-native';
import MapView, { Region } from 'react-native-maps';
import MapComponent from './MapComponent';

// --- Type Definitions ---
export type ZoneData = {
  center: {
    latitude: number;
    longitude: number;
  };
  radius: number; // in meters
};

export type InteractiveMapRef = {
  getCalculatedZone: () => ZoneData | null;
};

// Define the circle's visual size in one place
const CIRCLE_DIAMETER = 200;

// --- Component Definition ---
const InteractiveMap = forwardRef<InteractiveMapRef, {}>((props, ref) => {
  const mapRef = useRef<MapView>(null);
  const [currentRegion, setCurrentRegion] = useState<Region | null>(null);
  const [mapLayout, setMapLayout] = useState<{ width: number; height: number } | null>(null);

  /**
   * Calculates the GEOGRAPHICAL radius of our VISUAL circle based on zoom.
   */
  const calculateCircleRadius = (region: Region, layout: { width: number, height: number }): number => {
    const degreesPerPixel = region.latitudeDelta / layout.height;
    const circlePixelRadius = CIRCLE_DIAMETER / 2;
    const radiusInDegrees = degreesPerPixel * circlePixelRadius;
    return radiusInDegrees * 111000;
  };

  /**
   * Exposes a method to the parent component via the ref.
   * The parent can call this to get the current zone data.
   */
  useImperativeHandle(ref, () => ({
    getCalculatedZone: () => {
      if (currentRegion && mapLayout) {
        const radiusInMeters = calculateCircleRadius(currentRegion, mapLayout);
        return {
          center: {
            latitude: currentRegion.latitude,
            longitude: currentRegion.longitude,
          },
          radius: radiusInMeters,
        };
      }
      return null;
    }
  }));

  // Caches the latest map region as the user moves it
  const handleRegionChange = useCallback((region: Region) => {
    setCurrentRegion(region);
  }, []);
  
  // Captures the map container's dimensions when it renders
  const onMapLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setMapLayout({ width, height });
  };

  return (
    <View style={styles.mapContainer} onLayout={onMapLayout}>
      <MapComponent ref={mapRef} onRegionChange={handleRegionChange} />
      <View style={styles.invertedCircleOverlay} pointerEvents="none" />
      <View style={styles.circleBorder} pointerEvents="none" />
    </View>
  );
});

// --- Styles ---
const styles = StyleSheet.create({
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
    width: 2000,
    height: 2000,
    borderRadius: 1000,
    borderWidth: 1000 - (CIRCLE_DIAMETER / 2),
    borderColor: 'rgba(255, 0, 0, 0.4)',
  },
  circleBorder: {
    position: 'absolute',
    width: CIRCLE_DIAMETER,
    height: CIRCLE_DIAMETER,
    borderRadius: CIRCLE_DIAMETER / 2,
    borderWidth: 3,
    borderColor: 'red',
  },
});

export default InteractiveMap;