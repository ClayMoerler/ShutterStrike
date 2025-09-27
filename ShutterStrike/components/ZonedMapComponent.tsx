import React, { useRef } from 'react';
import MapView, { Polygon, Circle, LatLng, Region } from 'react-native-maps';
import { StyleSheet } from 'react-native';

// --- Props Definition ---
type ZonedMapProps = {
  zoneCenter: LatLng;
  zoneRadius: number; // in meters
  maxZoomOutMultiplier?: number; // Optional: control how far users can zoom out (2 = 2x initial view)
};

/**
 * A helper function to generate coordinates for a circle polygon.
 * This creates the "hole" in our overlay polygon.
 * Note: Points are generated in CLOCKWISE order for the hole to work properly.
 */
const createCircleHole = (center: LatLng, radiusInMeters: number, points: number = 64): LatLng[] => {
  const earthRadius = 6378137; // Earth's radius in meters
  const d = radiusInMeters / earthRadius;
  const lat1 = (Math.PI / 180) * center.latitude;
  const lng1 = (Math.PI / 180) * center.longitude;
  
  const circleCoords: LatLng[] = [];
  
  // Generate points in clockwise order (important for holes in react-native-maps)
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
 * This ensures the circle fills a reasonable portion of the screen.
 */
const calculateZoomDelta = (radiusInMeters: number): { latitudeDelta: number; longitudeDelta: number } => {
  // Rough conversion: 1 degree latitude ≈ 111,000 meters
  // We want the circle to fill about 1/3 to 1/2 of the screen
  const radiusInDegrees = radiusInMeters / 111000;
  const zoomFactor = 4; // Show area about 4x the radius
  
  return {
    latitudeDelta: radiusInDegrees * zoomFactor,
    longitudeDelta: radiusInDegrees * zoomFactor * 0.5, // Adjust for aspect ratio
  };
};

/**
 * Creates a rectangle that covers the visible map area.
 * The size is based directly on the circle radius.
 */
const createWorldOverlay = (center: LatLng, radiusInMeters: number, zoomOutMultiplier: number): LatLng[] => {
  // Convert radius to degrees and scale by zoom multiplier
  const radiusInDegrees = radiusInMeters / 111000; // 1 degree ≈ 111km
  const overlaySize = radiusInDegrees * zoomOutMultiplier * 8; // 8x radius for good coverage
  
  return [
    { latitude: center.latitude - overlaySize, longitude: center.longitude - overlaySize },
    { latitude: center.latitude - overlaySize, longitude: center.longitude + overlaySize },
    { latitude: center.latitude + overlaySize, longitude: center.longitude + overlaySize },
    { latitude: center.latitude + overlaySize, longitude: center.longitude - overlaySize },
    { latitude: center.latitude - overlaySize, longitude: center.longitude - overlaySize }, // Close the polygon
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
  
  // Create the hole (clear circle) coordinates
  const circleHoleCoords = createCircleHole(zoneCenter, zoneRadius);
  
  // Calculate zoom levels based on radius
  const zoomDeltas = calculateZoomDelta(zoneRadius);
  
  // Calculate max zoom based on circle radius - 2x the radius
  const radiusInDegrees = zoneRadius / 111000; // Convert radius to degrees
  const maxAllowedDelta = radiusInDegrees * 4; // Fixed at 2x the radius
  
  // Debug: Log the values to see what's happening
  console.log('Radius in meters:', zoneRadius);
  console.log('Radius in degrees:', radiusInDegrees);
  console.log('Initial delta:', zoomDeltas.latitudeDelta);
  console.log('Max allowed delta (2x radius):', maxAllowedDelta);
  
  // Create overlay coordinates based on the fixed 2x radius
  const overlayCoords = createWorldOverlay(zoneCenter, zoneRadius, 2);
  
  // Handle region changes to enforce zoom limits and center position
  const handleRegionChangeComplete = (region: Region) => {
    const isZoomedOutTooFar = region.latitudeDelta > maxAllowedDelta;
    
    // Only check center distance if user is zoomed out near the limit
    // This prevents interference when zooming in
    const shouldCheckCenter = region.latitudeDelta > maxAllowedDelta * 0.7; // Only check when zoomed out
    
    let isTooFarFromCenter = false;
    if (shouldCheckCenter) {
      const latDiff = Math.abs(region.latitude - zoneCenter.latitude);
      const lngDiff = Math.abs(region.longitude - zoneCenter.longitude);
      const maxCenterDistance = maxAllowedDelta * 0.5; // Allow some movement but keep centered
      isTooFarFromCenter = latDiff > maxCenterDistance || lngDiff > maxCenterDistance;
    }
    
    if (isZoomedOutTooFar || (shouldCheckCenter && isTooFarFromCenter)) {
      // Snap back to center with max allowed zoom (2x radius view)
      const constrainedRegion: Region = {
        latitude: zoneCenter.latitude,
        longitude: zoneCenter.longitude,
        latitudeDelta: maxAllowedDelta,
        longitudeDelta: maxAllowedDelta * 0.5, // Maintain aspect ratio
      };
      
      mapRef.current?.animateToRegion(constrainedRegion, 300);
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
      // Fixed zoom limit - 2x the circle radius
      maxDelta={maxAllowedDelta} // Native zoom limit set to 2x radius
      onRegionChangeComplete={handleRegionChangeComplete} // Manual enforcement
      
      showsUserLocation={true}
    >
      {/* The Polygon creates the red overlay with a transparent circular hole */}
      <Polygon
        coordinates={overlayCoords}
        holes={[circleHoleCoords]}
        fillColor="rgba(255, 0, 0, 0.4)" // Semi-transparent red
        strokeWidth={0}
      />
      
      {/* Optional: Circle border to clearly define the zone boundary */}
      <Circle
        center={zoneCenter}
        radius={zoneRadius}
        strokeColor="red"
        strokeWidth={2}
        fillColor="transparent" // Keep the inside transparent
      />
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});