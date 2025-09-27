import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';

// Import your SVG file directly, just like in your index.tsx
// Make sure the path is correct for your project structure.
import WizardMale from '../assets/images/wizard_male.svg';

// We'll populate the scroller with the imported SVG.
// You can add other imported SVGs to this array.
const SCROLLER_ITEMS = [
  { id: '1', Component: WizardMale },
  { id: '2', Component: WizardMale },
  { id: '3', Component: WizardMale },
  { id: '4', Component: WizardMale },
  { id: '5', Component: WizardMale },
  { id: '6', Component: WizardMale },
  { id: '7', Component: WizardMale },
];

/**
 * A horizontal scrolling component that displays SVG icons.
 */
export default function HorizontalScroller() {
  return (
    <View style={styles.scrollerContainer}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {SCROLLER_ITEMS.map(({ id, Component }) => (
          // The imported SVG can be rendered like a component
          <View key={id} style={styles.item}>
            <Component width={48} height={48} fill="#e0e0e0" />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollerContainer: {
    height: 120,
    backgroundColor: '#1c1f22',
    justifyContent: 'center',
    paddingTop: 40,
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
    borderRadius: 35, // Makes the container a circle
  },
});

