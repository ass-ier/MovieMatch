import React from 'react';
import { Modal, View, Text, Image, Button } from 'react-native';

export default function MovieModal({ visible, movie, onClose }) {
  if (!movie) return null;
  return (
    <Modal visible={visible} animationType="slide">
      <View>
        <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }} style={{ width: 300, height: 450 }} />
        <Text>{movie.title}</Text>
        <Text>{movie.overview}</Text>
        <Button title="Close" onPress={onClose} />
      </View>
    </Modal>
  );
} 