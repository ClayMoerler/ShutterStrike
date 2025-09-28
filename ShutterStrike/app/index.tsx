import { Text, View, StyleSheet } from 'react-native';
import StyledButton from '../components/StyledButton';
import SettingsIcon from '../assets/images/cog.svg';
import IconButton from '../components/IconButton';
import StyledTextInput from '@/components/StyledTextInput';
import { initLobby, sendUserData } from '@/api/api-calls';
import { useRouter } from 'expo-router'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import { startLocationTracking } from '@/api/location-tracker';
import { TextEncoder, TextDecoder } from 'text-encoding'

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

export default function Index() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <IconButton 
          IconComponent={SettingsIcon}
          size={28} 
          onPress={() => alert('Settings pressed!')}
        />
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Shutter Strike</Text>
        
        {/* Host Lobby */}
        <StyledButton 
          title="Start Lobby" 
          onPress={() => {
            initLobby();
            sendUserData();
            startLocationTracking(({ latitude, longitude }) => {
              console.log('Live location:', latitude, longitude);
            });
            router.push('/lobby_host');
          }}
        />
        
        {/* Join Lobby */}
        <View style={styles.buttonContainer}>
          <StyledTextInput
            placeholder="Room Code"
            placeholderTextColor="#ffffff3b"
            style={{ width: '65%', marginVertical: 0 }}
          />

          <StyledButton 
            title="Go" 
            onPress={async () => { 
              const accepted = await sendUserData();
              if (accepted) {
                startLocationTracking(({ latitude, longitude }) => {
                  console.log('Live location:', latitude, longitude);
                });
                router.push('/lobby_player');
              }
            }}
            style={{ width: '30%' }}
          />
        </View>
      </View>
    </SafeAreaView>
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
    flexDirection: 'row', 
    width: '100%',
    alignItems: 'center', 
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 40,
  },
});
