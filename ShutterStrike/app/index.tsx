import { Text, View, StyleSheet } from 'react-native';
import StyledButton from '../components/StyledButton';
import SettingsIcon from '../assets/images/cog.svg';
import IconButton from '../components/IconButton';
import StyledTextInput from '@/components/StyledTextInput';
import { initLobby } from '@/api/api-calls';
import { generateUUID } from '@/util/utilities';
import { useRouter } from 'expo-router'; 


export default function Index() {
  const router = useRouter();
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
          onPress={() => {
            router.push('/lobby_host')
            initLobby();
            generateUUID();
          }}
        />
        
        <View style={styles.buttonContainer}>

          <StyledTextInput
            placeholder='Room Code'
            placeholderTextColor="#ffffff3b"
            style={{ width: '65%', marginVertical: 0 }}
            />


          <StyledButton 
            title="Go" 
            onPress={() =>{ 
              router.push('/lobby_player')
              generateUUID(); 
            }}
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

