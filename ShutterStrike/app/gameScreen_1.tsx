import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CameraComponent from "../components/CameraComponent";
import GameBanner from "../components/GameBanner";
import GameInteractables from "../components/GameInteractables";
import { useRouter, useNavigation } from "expo-router";

export default function GameScreen_1() {
  const handlePhotoTaken = (uri: string) => {
    console.log("Photo captured at:", uri);
  };

  const router = useRouter();
  const navigation = useNavigation();
  const allowExitRef = useRef(false); // prevents popup on intentional quit

  useEffect(() => {
    const listener = navigation.addListener("beforeRemove", (e) => {
      // If we already allowed exit, skip popup
      if (allowExitRef.current) return;

      // Only intercept back gestures / hardware back
      if (e.data.action.type !== "GO_BACK") return;

      e.preventDefault();

      Alert.alert(
        "Quit Game?",
        "Are you sure you want to quit? Progress will be lost.",
        [
          { text: "Cancel", style: "cancel", onPress: () => {} },
          {
            text: "Quit",
            style: "destructive",
            onPress: () => {
              allowExitRef.current = true;
              router.replace("/"); // back to home page
            },
          },
        ]
      );
    });

    return listener;
  }, [navigation, router]);

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
          cameraCooldown={false}
          classAbilityCooldown={false}
          onMapPress={() => router.push("/gameScreen_0")} // 👈 programmatic nav unaffected
          onClassAbilityPress={() => console.log("Class ability pressed")}
          showMapButton={true}
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
