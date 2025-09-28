import React from "react";
import { View, StyleSheet } from "react-native";
import { SvgProps } from "react-native-svg";  // 👈 use react-native-svg props

import CameraIcon from "@/assets/images/camera.svg";
import ClairvoyantIcon from "@/assets/classcons/clairvoyant.svg";
import ClericIcon from "@/assets/classcons/cleric.svg";
import IllusionistIcon from "@/assets/classcons/illusionist.svg";
import DisabledOverlay from "@/assets/images/disabled.svg";

import IconButton from "./IconButton";

type GameInteractablesProps = {
  playerClass: "clairvoyant" | "cleric" | "illusionist";
  cameraCooldown: boolean;
  classAbilityCooldown: boolean;
  onCameraPress: () => void;
  onClassAbilityPress: () => void;
};

export default function GameInteractables({
  playerClass,
  cameraCooldown,
  classAbilityCooldown,
  onCameraPress,
  onClassAbilityPress,
}: GameInteractablesProps) {
  // Pick correct class icon
  let ClassIcon: React.FC<SvgProps>;
  switch (playerClass) {
    case "clairvoyant":
      ClassIcon = ClairvoyantIcon;
      break;
    case "cleric":
      ClassIcon = ClericIcon;
      break;
    case "illusionist":
      ClassIcon = IllusionistIcon;
      break;
    default:
      ClassIcon = ClericIcon; // fallback
  }

  return (
    <View style={styles.container}>
      {/* Camera button */}
      <View style={styles.iconWrapper}>
        <IconButton IconComponent={CameraIcon} size={60} onPress={onCameraPress} />
        {cameraCooldown && (
          <DisabledOverlay style={styles.overlay} width={60} height={60} />
        )}
      </View>

      {/* Class ability button */}
      <View style={styles.iconWrapper}>
        <IconButton IconComponent={ClassIcon} size={60} onPress={onClassAbilityPress} />
        {classAbilityCooldown && (
          <DisabledOverlay style={styles.overlay} width={60} height={60} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  iconWrapper: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
  },
});
