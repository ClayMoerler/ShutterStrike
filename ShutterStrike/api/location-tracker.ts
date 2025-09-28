import * as Location from 'expo-location';

type LocationCoords = { latitude: number; longitude: number };
let locationSubscription: Location.LocationSubscription | null = null;

export async function startLocationTracking(
  onLocationUpdate: (coords: LocationCoords) => void
): Promise<void> {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    console.error('Permission denied');
    return;
  }

  locationSubscription = await Location.watchPositionAsync(
    {
      accuracy: Location.Accuracy.High,
      timeInterval: 500,
      distanceInterval: 5,
    },
    (loc) => {
      const { latitude, longitude } = loc.coords;
      onLocationUpdate({ latitude, longitude });
    }
  );
}

export function stopLocationTracking() {
  if (locationSubscription) {
    locationSubscription.remove();
    locationSubscription = null;
  }
}

