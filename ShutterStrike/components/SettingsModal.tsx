import React from 'react';
import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import CameraComponent from "../components/CameraComponent";

interface SettingsModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function SettingsModal({ visible, onClose }: SettingsModalProps) {
      const handlePhotoTaken = (uri: string) => {
    console.log("Photo captured at:", uri);
  };
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
        <View style={styles.cameraWrapper}><CameraComponent onPhotoTaken={handlePhotoTaken} enableZoom={false} /><View style={styles.cameraWrapper}/>
            

          <Text style={styles.description}>
            Here you can put your settings options.
          </Text>

          <Pressable
            style={styles.closeButton}
            onPress={onClose}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </View>

    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#333',
    borderRadius: 12,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#fff',
  },
  description: {
    marginBottom: 20,
    color: '#ddd',
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#555',
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
    cameraWrapper: {
    flex: 1,
  },
});