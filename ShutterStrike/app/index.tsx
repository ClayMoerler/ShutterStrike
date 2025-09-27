import { Text, View, StyleSheet } from 'react-native';
import StyledButton from '../components/StyledButton'; // <-- Import the component
import SettingsIcon from '../assets/images/cog.svg';
import IconButton from '../components/IconButton';

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shutter Strike</Text>
      
      {/* Use the reusable component */}
      <StyledButton 
        title="Start Lobby" 
        onPress={() => alert('Button 1 pressed!')} 
      />
      
      <StyledButton 
        title="Join Lobby" 
        onPress={() => alert('Button 2 pressed!')} 
      />

      <IconButton 
        IconComponent={SettingsIcon}
        size={28} 
        color="#fff" 
        onPress={() => alert('Settings pressed!')}
      />      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 40,
  },
});