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
          
          {/* 📸 Camera with enforced 4:3 ratio */}
          <View style={styles.cameraWrapper}>
            <CameraComponent 
              onPhotoTaken={handlePhotoTaken} 
              enableZoom={false} 
              facing="front"
              popup // 👈 smaller button in bottom-right
            />
          </View>

          <Text style={styles.description}>
            Scan your face!
          </Text>

          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </Pressable>
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
    width: '85%',
    padding: 20,
    backgroundColor: '#333',
    borderRadius: 12,
    alignItems: 'center',
  },
  cameraWrapper: {
    width: "100%",          // take full modal width
    aspectRatio: 3 / 4,     // 👈 force 4:3 preview
    marginBottom: 15,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "black", // avoids flicker
  },
  description: {
    marginVertical: 12,
    color: '#ddd',
    textAlign: "center",
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
});
