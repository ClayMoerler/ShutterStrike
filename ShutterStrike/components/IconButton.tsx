import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { SvgProps } from 'react-native-svg';

type IconButtonProps = {
  // The prop is now the SVG component itself
  IconComponent: React.FC<SvgProps>; 
  size: number;
  color: string;
  onPress: () => void;
};

export default function IconButton({ IconComponent, size, color, onPress }: IconButtonProps) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      {/* Render the component and pass props to it */}
      <IconComponent width={size} height={size} fill={color} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 8,
  },
});