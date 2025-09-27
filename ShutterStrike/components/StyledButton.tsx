// In your components/StyledButton.js file

import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle } from 'react-native';

// Define the component's props
type StyledButtonProps = {
  title: string;
  onPress: () => void;
  style?: ViewStyle; // <-- 1. Add an optional style prop
};

export default function StyledButton({ title, onPress, style }: StyledButtonProps) {
  return (
    // 2. Merge the default styles with the passed-in style
    <Pressable style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ffd33d',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    width: '100%', // This is the default width
  },
  text: {
    color: '#25292e',
    fontSize: 16,
    fontWeight: 'bold',
  },
});