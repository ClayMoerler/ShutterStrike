import { Text, View, StyleSheet } from 'react-native';
import StyledButton from '../components/StyledButton';
import SettingsIcon from '../assets/images/cog.svg';
import IconButton from '../components/IconButton';

export default function Index() {
  return (
    <View style={styles.container}>

      <View style={styles.headerContainer}>
        <IconButton 
          IconComponent={SettingsIcon}
          size={28} 
          onPress={() => alert('Settings pressed!')}
        />
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Shutter Strike</Text>
        
        <StyledButton 
          title="Start Lobby" 
          onPress={() => alert('Button 1 pressed!')} 
        />
        
        {/* This container will span the full width and push the button to the right */}
        <View style={styles.buttonContainer}>
          <StyledButton 
            title="Join Lobby" 
            onPress={() => alert('Button 2 pressed!')} 
            style={{ width: '30%' }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    padding: 24,
  },
  headerContainer: {
    alignItems: 'flex-end',
  },
  contentContainer: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  buttonContainer: {
    width: '100%', 
    alignItems: 'flex-end', 
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 40,
  },
});

