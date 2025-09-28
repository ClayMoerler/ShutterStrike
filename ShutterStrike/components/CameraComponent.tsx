import React, { useRef, useState, useCallback } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

type CameraComponentProps = {
  onPhotoTaken: (uri: string) => void;
  enableZoom?: boolean;
  facing?: "front" | "back";
};

export default function CameraComponent({
  onPhotoTaken,
  enableZoom = false,
  facing = "back",
}: CameraComponentProps) {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [zoom, setZoom] = useState(0);
  
  const currentZoomRef = useRef(0);

  const pinchGesture = React.useMemo(
    () =>
      Gesture.Pinch()
        .onStart(() => {
          currentZoomRef.current = zoom;
        })
        .onUpdate((e) => {
          if (!enableZoom) return;
          const sensitivity = 0.02;
          let nextZoom = currentZoomRef.current + (e.scale - 1) * sensitivity;
          if (!isFinite(nextZoom) || isNaN(nextZoom)) return;
          nextZoom = Math.max(0, Math.min(1, nextZoom));
          currentZoomRef.current = nextZoom;
          setZoom(nextZoom);
        })
        .runOnJS(true),
    [enableZoom, zoom]
  );

  const takePhoto = useCallback(async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({ 
          quality: 0.7,
          skipProcessing: true 
        });
        if (photo?.uri) {
          onPhotoTaken(photo.uri);
        }
      } catch (error) {
        console.warn('Photo capture failed:', error);
      }
    }
  }, [onPhotoTaken]);

  if (!permission) {
    return <View style={styles.center} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <TouchableOpacity onPress={requestPermission} style={styles.requestBtn}>
          <Text style={styles.requestBtnText}>Grant Camera Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const safeZoom = Math.max(0, Math.min(1, isFinite(zoom) ? zoom : 0));

  return (
    <View style={styles.container}>
      <GestureDetector gesture={pinchGesture}>
        <CameraView
          style={styles.camera}
          facing={facing}
          zoom={safeZoom}
          ref={cameraRef}
        />
      </GestureDetector>
      <TouchableOpacity style={styles.captureButton} onPress={takePhoto} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: 'black'
  },
  camera: { flex: 1 },
  captureButton: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "white",
    borderWidth: 4,
    borderColor: "black",
  },
  center: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center",
    backgroundColor: 'black'
  },
  requestBtn: {
    backgroundColor: "#007bff",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  requestBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: '600'
  },
});
