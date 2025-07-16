import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

export default function MovieCard({ movie, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View>
        <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }} style={{ width: 300, height: 450 }} />
        <Text>{movie.title}</Text>
        <Text>{movie.overview}</Text>
      </View>
    </TouchableOpacity>
  );
} 