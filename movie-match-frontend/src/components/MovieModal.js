import React, { useRef, useEffect } from 'react';
import { Modal, View, Text, Image, Button, StyleSheet, Animated } from 'react-native';

export default function MovieModal({ visible, movie, onClose }) {
  const slideAnim = useRef(new Animated.Value(600)).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 7,
        useNativeDriver: true,
      }).start();
    } else {
      slideAnim.setValue(600);
    }
  }, [visible]);

  if (!movie) return null;
  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.overlay}>
        <Animated.View style={[styles.modal, { transform: [{ translateY: slideAnim }] }]}> 
          <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }} style={styles.image} />
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.overview}>{movie.overview}</Text>
          <Button title="Close" color="#7F7FD5" onPress={onClose} />
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#7F7FD5',
    shadowOpacity: 0.18,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    width: 320,
    elevation: 6,
  },
  image: {
    width: 220,
    height: 320,
    borderRadius: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#7F7FD5',
    marginBottom: 8,
    textAlign: 'center',
  },
  overview: {
    fontSize: 15,
    color: '#444',
    textAlign: 'center',
    marginBottom: 16,
  },
}); 