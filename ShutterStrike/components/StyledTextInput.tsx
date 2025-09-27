import React from 'react';
import { TextInput, StyleSheet, ViewStyle, TextInputProps } from 'react-native';

type StyledTextInputProps = TextInputProps & {
  style?: ViewStyle;
};

const StyledTextInput = ({ style, ...props }: StyledTextInputProps) => {
  return (
    <TextInput
      style={[styles.input, style]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    width: '100%',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    color: '#fff', // Color of the text the user types
    marginVertical: 20,
    fontSize: 16,
  },
});

export default StyledTextInput;

