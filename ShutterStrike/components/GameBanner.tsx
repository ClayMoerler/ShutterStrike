import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import HeartFull from "@/assets/images/heart_full.svg";
import HeartEmpty from "@/assets/images/heart_empty.svg";

type GameStatusBarProps = {
  lives: number;       // current lives
  maxLives: number;    // max lives
  gameTimer: number;   // countdown starting value (updated by server)
  active: boolean;     // flips timer color
};

export default function GameBanner({
  lives,
  maxLives,
  gameTimer,
  active,
}: GameStatusBarProps) {
  const [time, setTime] = useState(gameTimer);

  // Reset timer whenever gameTimer prop changes
  useEffect(() => {
    setTime(gameTimer);
  }, [gameTimer]);

  useEffect(() => {
    if (time <= 0) return;
    const interval = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [time]);

  // Generate hearts
  const hearts = [];
  for (let i = 0; i < maxLives; i++) {
    hearts.push(
      i < lives ? (
        <HeartFull key={i} width={28} height={28} />
      ) : (
        <HeartEmpty key={i} width={28} height={28} />
      )
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.hearts}>{hearts}</View>
      <Text
        style={[
          styles.timer,
          { color: active ? "#FF4444" : "#4444FF" },
        ]}
      >
        {time}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 20,
    left: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  hearts: {
    flexDirection: "row",
    marginRight: 12,
  },
  timer: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
