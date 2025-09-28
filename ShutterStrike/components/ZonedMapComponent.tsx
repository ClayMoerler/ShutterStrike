import React, { useRef } from 'react';
import { StyleSheet, Platform } from 'react-native';
import MapView, { Polygon, Circle, LatLng, Region } from 'react-native-maps';

// --- Props Definition ---
type ZonedMapProps = {
  zoneCenter: LatLng;
  zoneRadius: number; // in meters
  maxZoomOutMultiplier?: number; // Optional: control how far users can zoom out (e.g., 2 = 2x initial view)
};

/**
 * A helper function to generate coordinates for a circle polygon.
 * This creates the "hole" in our overlay polygon.
 */
const createCircleHole = (center: LatLng, radiusInMeters: number, points: number = 64): LatLng[] => {
  const earthRadius = 6378137; // Earth's radius in meters
  const d = radiusInMeters / earthRadius;
  const lat1 = (Math.PI / 180) * center.latitude;
  const lng1 = (Math.PI / 180) * center.longitude;
  
  const circleCoords: LatLng[] = [];
  
  // Generate points in clockwise order for the hole to work properly
  for (let i = points; i >= 0; i--) {
    const angle = (i / points) * 360;
    const bearing = (angle * Math.PI) / 180;
    
    const lat2 = Math.asin(
      Math.sin(lat1) * Math.cos(d) + 
      Math.cos(lat1) * Math.sin(d) * Math.cos(bearing)
    );
    
    const lng2 = lng1 + Math.atan2(
      Math.sin(bearing) * Math.sin(d) * Math.cos(lat1), 
      Math.cos(d) - Math.sin(lat1) * Math.sin(lat2)
    );
    
    circleCoords.push({
      latitude: (lat2 * 180) / Math.PI,
      longitude: (lng2 * 180) / Math.PI,
    });
  }
  
  return circleCoords;
};

/**
 * Calculate appropriate zoom delta based on radius.
 */
const calculateZoomDelta = (radiusInMeters: number): { latitudeDelta: number; longitudeDelta: number } => {
  const radiusInDegrees = radiusInMeters / 111000;
  const zoomFactor = 2.5; // A smaller value zooms in more
  
  return {
    latitudeDelta: radiusInDegrees * zoomFactor,
    longitudeDelta: radiusInDegrees * zoomFactor * 0.5, // Adjust for screen aspect ratio
  };
};

/**
 * Creates a rectangle that covers the visible map area.
 */
const createWorldOverlay = (center: LatLng, radiusInMeters: number, zoomOutMultiplier: number): LatLng[] => {
  const radiusInDegrees = radiusInMeters / 111000;
  const overlaySize = radiusInDegrees * zoomOutMultiplier * 8;
  
  return [
    { latitude: center.latitude - overlaySize, longitude: center.longitude - overlaySize },
    { latitude: center.latitude - overlaySize, longitude: center.longitude + overlaySize },
    { latitude: center.latitude + overlaySize, longitude: center.longitude + overlaySize },
    { latitude: center.latitude + overlaySize, longitude: center.longitude - overlaySize },
    { latitude: center.latitude - overlaySize, longitude: center.longitude - overlaySize },
  ];
};

/**
 * A map component that displays a red shaded area everywhere EXCEPT inside a circular zone.
 */
export default function ZonedMapComponent({ 
  zoneCenter, 
  zoneRadius, 
  maxZoomOutMultiplier = 2 // Default: can zoom out to 2x the initial view
}: ZonedMapProps) {
  const mapRef = useRef<MapView>(null);
  const isAnimating = useRef(false); // Flag to prevent animation loops

  const circleHoleCoords = createCircleHole(zoneCenter, zoneRadius);
  const zoomDeltas = calculateZoomDelta(zoneRadius); // This is our stable, initial zoom delta
  const maxAllowedDelta = zoomDeltas.latitudeDelta * maxZoomOutMultiplier;
  const overlayCoords = createWorldOverlay(zoneCenter, zoneRadius, maxZoomOutMultiplier);
  
  // Handle region changes to enforce zoom and pan limits
  const handleRegionChangeComplete = (region: Region) => {
    // If the change was triggered by our own animation, ignore it and reset the flag.
    if (isAnimating.current) {
      isAnimating.current = false;
      return;
    }

    // Check 1: Has the user zoomed out too far?
    if (region.latitudeDelta > maxAllowedDelta) {
      isAnimating.current = true; // Set flag before animating
      mapRef.current?.animateToRegion({
        latitude: zoneCenter.latitude,
        longitude: zoneCenter.longitude,
        latitudeDelta: maxAllowedDelta,
        longitudeDelta: maxAllowedDelta * 0.5,
      }, 300);
      return; 
    }

    // Check 2: Has the user panned too far from the center?
    const panBoundaryMultiplier = 1.5;
    
    // Use the stable initial zoomDeltas to define a fixed boundary
    const maxLatDistance = (zoomDeltas.latitudeDelta / 2) * panBoundaryMultiplier;
    // **THE FIX**: Use latitudeDelta for both calculations to create a square boundary
    const maxLngDistance = (zoomDeltas.latitudeDelta / 2) * panBoundaryMultiplier;
    
    const latDiff = Math.abs(region.latitude - zoneCenter.latitude);
    const lngDiff = Math.abs(region.longitude - zoneCenter.longitude);
    
    if (latDiff > maxLatDistance || lngDiff > maxLngDistance) {
      isAnimating.current = true; // Set flag before animating
      mapRef.current?.animateToRegion({
        latitude: zoneCenter.latitude,
        longitude: zoneCenter.longitude,
        latitudeDelta: region.latitudeDelta,
        longitudeDelta: region.longitudeDelta,
      }, 300);
    }
  };
  
  return (
    <MapView
      ref={mapRef}
      style={styles.map}
      initialRegion={{
        ...zoneCenter,
        latitudeDelta: zoomDeltas.latitudeDelta,
        longitudeDelta: zoomDeltas.longitudeDelta,
      }}
      maxDelta={maxAllowedDelta}
      onRegionChangeComplete={handleRegionChangeComplete}
      showsUserLocation={true}
    >
      {/* The Polygon creates the red overlay with a transparent circular hole */}
      <Polygon
        coordinates={overlayCoords}
        holes={[circleHoleCoords]}
        fillColor="rgba(255, 0, 0, 0.4)"
        strokeWidth={0}
      />
      
      {/* Optional: Circle border to clearly define the zone boundary */}
      <Circle
        center={zoneCenter}
        radius={zoneRadius}
        strokeColor="red"
        strokeWidth={2}
        fillColor="transparent"
      />
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});