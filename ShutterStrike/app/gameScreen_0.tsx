import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useNavigation } from "expo-router";
import ZonedMapComponent from "../components/ZonedMapComponent";
import GameBanner from "../components/GameBanner";
import GameInteractables from "../components/GameInteractables";

const GAME_ZONE = {
  center: {
    latitude: 20.638553832144332,
    longitude: -76.32894225418568,
  },
  radius: 63279.22279608262, // in meters
};

export default function GameScreen_0() {
  const router = useRouter();
  const navigation = useNavigation();
  const allowExitRef = useRef(false); // flag to bypass guard on Quit

  useEffect(() => {
    const listener = navigation.addListener("beforeRemove", (e) => {
      // If we allowed exit (Quit pressed), skip popup
      if (allowExitRef.current) return;

      // Only block gesture/hardware back
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
              allowExitRef.current = true; // let navigation through
              router.replace("/"); // send to index.tsx
            },
          },
        ]
      );
    });

    return listener;
  }, [navigation, router]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mapContainer}>
        <ZonedMapComponent
          zoneCenter={GAME_ZONE.center}
          zoneRadius={GAME_ZONE.radius}
        />

        {/* HUD Overlay - Top */}
        <GameBanner
          lives={3}
          maxLives={5}
          gameTimer={999}
          nextZoneCountdown={999}
          gracePeriodActive={false}
          gracePeriodTimer={101}
        />

        {/* HUD Overlay - Bottom */}
        <GameInteractables
          playerClass="cleric"
          cameraCooldown={false}
          classAbilityCooldown={false}
          onCameraPress={() => {
            console.log("Camera pressed");
            router.push("/gameScreen_1");
          }}
          onClassAbilityPress={() => console.log("Class ability pressed")}
          showMapButton={false}
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
  mapContainer: {
    flex: 1,
    width: "100%",
    alignSelf: "center",
    borderRadius: 12,
    overflow: "hidden",
  },
});
