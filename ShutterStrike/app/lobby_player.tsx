import React from 'react';
import { Text, View, StyleSheet, StatusBar } from 'react-native';
import HorizontalScroller from '../components/HorizontalScroller';

export default function LobbyScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <HorizontalScroller />
      <View style={styles.mainContent}>
        <Text style={styles.text}>Player Lobby</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
  },
  mainContent: {
    flex: 1, // This makes the main content area fill the remaining space
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 24,
  },
});
