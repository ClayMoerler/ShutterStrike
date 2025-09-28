import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import HeartFull from "@/assets/images/heart_full.svg";
import HeartEmpty from "@/assets/images/heart_empty.svg";

type GameStatusBarProps = {
  lives: number;
  maxLives: number;
  gameTimer: number;
  nextZoneCountdown: number;
  gracePeriodActive: boolean;
  gracePeriodTimer: number;
};

export default function GameBanner({
  lives,
  maxLives,
  gameTimer,
  nextZoneCountdown,
  gracePeriodActive,
  gracePeriodTimer,
}: GameStatusBarProps) {
  // Hearts
  const hearts = [];
  for (let i = 0; i < maxLives; i++) {
    const Icon = i < lives ? HeartFull : HeartEmpty;
    hearts.push(
      <View key={i} style={i < maxLives - 1 ? { marginRight: 6 } : undefined}>
        <Icon width={28} height={28} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Hearts (left side) */}
      <View style={[styles.box, styles.heartsContainer]}>
        <View style={styles.hearts}>{hearts}</View>
      </View>

      {/* Countdown (right side) */}
      <View style={[styles.box, styles.countdownContainer]}>
        {gracePeriodActive ? (
          <Text style={[styles.value, { color: "#00FF88" }]}>{gracePeriodTimer}</Text>
        ) : (
          <>
            <Text style={[styles.value, { color: "#FFAA00" }]}>{nextZoneCountdown}</Text>
            <Text style={styles.separator}>|</Text>
            <Text style={[styles.value, { color: "#FF4444" }]}>{gameTimer}</Text>
          </>
        )}
      </View>
    </View>
  );
}

const baseRounded = {
  backgroundColor: "#25292e",
  borderRadius: 14,
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 20,
    left: 16,
    right: 16,
    flexDirection: "row",
    justifyContent: "space-between", // ✅ hearts left, timer right
    alignItems: "center",
  },
  box: {
    ...baseRounded,
    paddingHorizontal: 10,
    paddingVertical: 6,
    minHeight: 40,
    justifyContent: "center",
  },
  heartsContainer: {
    flexShrink: 1,
  },
  hearts: {
    flexDirection: "row",
    flexWrap: "nowrap",
  },
  countdownContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 100,            // ✅ fixed width for stable size
    justifyContent: "center",
  },
  value: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    ...(Platform.OS === "ios" ? { fontVariant: ["tabular-nums"] } : null),
  },
  separator: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginHorizontal: 6,
  },
});
