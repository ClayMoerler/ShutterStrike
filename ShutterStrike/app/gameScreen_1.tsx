import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CameraComponent from "../components/CameraComponent";
import { useRouter } from "expo-router";

export default function GameScreen_1() {
  const handlePhotoTaken = (uri: string) => {
    console.log("Photo captured at:", uri);
  };

  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <CameraComponent onPhotoTaken={handlePhotoTaken} enableZoom={true} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});
