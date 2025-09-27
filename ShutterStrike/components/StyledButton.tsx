import { Text, StyleSheet, Pressable } from 'react-native';

// 1. Define the types for the component's props
type StyledButtonProps = {
  title: string;
  onPress: () => void; // A function that takes no arguments and returns nothing
};

// 2. Apply the types to the props object
export default function StyledButton({ title, onPress }: StyledButtonProps) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.buttonLabel}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4D4D4D',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    marginBottom: 16,
    minWidth: 200,
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 16,
  },
});