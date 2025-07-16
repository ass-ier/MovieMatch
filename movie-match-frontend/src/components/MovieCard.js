import React, { useRef, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated } from 'react-native';

export default function MovieCard({ movie, onPress }) {
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  }, []);

  if (!movie) return <View style={styles.empty}><Text>No more movies!</Text></View>;

  return (
    <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }] }]}> 
      <TouchableOpacity onPress={onPress} activeOpacity={0.85}>
        <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }} style={styles.image} />
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.overview} numberOfLines={4}>{movie.overview}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 18,
    alignItems: 'center',
    shadowColor: '#7F7FD5',
    shadowOpacity: 0.18,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    marginBottom: 16,
    minHeight: 420,
    width: 320,
    elevation: 4,
  },
  image: {
    width: 260,
    height: 360,
    borderRadius: 18,
    marginBottom: 14,
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
  },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 400,
  },
}); 