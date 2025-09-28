import React from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CameraComponent from "../components/CameraComponent";
import GameBanner from "../components/GameBanner";
import GameInteractables from "../components/GameInteractables"; // 👈 import
import { useRouter } from "expo-router";

export default function GameScreen_1() {
  const handlePhotoTaken = (uri: string) => {
    console.log("Photo captured at:", uri);
  };

  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cameraWrapper}>
        {/* Camera feed */}
        <CameraComponent onPhotoTaken={handlePhotoTaken} enableZoom={true} />

        {/* HUD Overlay - Top */}
        <GameBanner
          lives={3}
          maxLives={5}
          gameTimer={200}
          nextZoneCountdown={100}
          gracePeriodActive={false}
          gracePeriodTimer={50}
        />

        {/* HUD Overlay - Bottom */}
        <GameInteractables
          playerClass="cleric"
          cameraCooldown={false} // 👈 ignored since map has no cooldown
          classAbilityCooldown={false}
          onMapPress={() => router.push("/gameScreen_0")} // 👈 go back to map screen
          onClassAbilityPress={() => console.log("Class ability pressed")}
          showMapButton={true} // 👈 show map here
        />

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  cameraWrapper: {
    flex: 1,
  },
});
