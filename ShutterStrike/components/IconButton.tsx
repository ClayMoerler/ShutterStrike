import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { SvgProps } from 'react-native-svg';

type IconButtonProps = {
  IconComponent: React.FC<SvgProps>; 
  size: number;
  onPress: () => void;
};

export default function IconButton({ IconComponent, size, onPress }: IconButtonProps) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <IconComponent width={size} height={size}/>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
  },
});