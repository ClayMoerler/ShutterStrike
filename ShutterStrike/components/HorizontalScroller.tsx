import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import WizardMale from '../assets/images/wizard_male.svg';

type HorizontalScrollerProps = {
  playerCount?: number; // optional
};

export default function HorizontalScroller({ playerCount = 1 }: HorizontalScrollerProps) {
  // Create an array [0, 1, 2, ..., playerCount-1]
  const players = Array.from({ length: playerCount }, (_, i) => i);

  return (
    <View style={styles.scrollerContainer}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {players.map((index) => (
          <View key={index} style={styles.item}>
            <WizardMale width={48} height={48} fill="#e0e0e0" />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollerContainer: {
    paddingVertical: 16,
    backgroundColor: '#1c1f22',
    justifyContent: 'center',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#3a3f44',
  },
  scrollViewContent: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  item: {
    width: 70,
    height: 70,
    backgroundColor: '#3a3f44',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    borderRadius: 35,
  },
});
