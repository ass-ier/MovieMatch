import React, { useEffect, useState, useRef } from 'react';
import { View, Button, StyleSheet, Animated, Text } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import api from '../services/api';
import MovieCard from '../components/MovieCard';
import { LinearGradient } from 'expo-linear-gradient';

export default function SwipeScreen({ navigation }) {
  const [movies, setMovies] = useState([]);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    api.get('/movies').then(res => setMovies(res.data));
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 900,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleSwipeRight = (cardIndex) => {
    const movie = movies[cardIndex];
    api.post('/swipe', { movieId: movie.id });
  };

  return (
    <LinearGradient colors={['#FFDEE9', '#B5FFFC']} style={styles.gradient}>
      <Animated.View style={[styles.swiperContainer, { opacity: fadeAnim }]}> 
        <Text style={styles.title}>🍿 Swipe Movies!</Text>
        <Swiper
          cards={movies}
          renderCard={movie => <MovieCard movie={movie} />}
          onSwipedRight={handleSwipeRight}
          stackSize={3}
          backgroundColor="transparent"
          cardVerticalMargin={30}
        />
        <View style={styles.buttonRow}>
          <Button title="Friends" color="#7F7FD5" onPress={() => navigation.navigate('Friends')} />
          <Button title="Matches" color="#F7971E" onPress={() => navigation.navigate('Matches')} />
        </View>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'center',
  },
  swiperContainer: {
    flex: 1,
    paddingTop: 40,
    paddingBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#7F7FD5',
    marginBottom: 16,
    letterSpacing: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 24,
    gap: 16,
  },
}); 