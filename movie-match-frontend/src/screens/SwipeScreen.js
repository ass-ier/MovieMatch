import React, { useEffect, useState } from 'react';
import { View, Button } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import api from '../services/api';
import MovieCard from '../components/MovieCard';

export default function SwipeScreen({ navigation }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    api.get('/movies').then(res => setMovies(res.data));
  }, []);

  const handleSwipeRight = (cardIndex) => {
    const movie = movies[cardIndex];
    api.post('/swipe', { movieId: movie.id });
  };

  return (
    <View style={{ flex: 1 }}>
      <Swiper
        cards={movies}
        renderCard={movie => <MovieCard movie={movie} />}
        onSwipedRight={handleSwipeRight}
        stackSize={3}
      />
      <Button title="Friends" onPress={() => navigation.navigate('Friends')} />
      <Button title="Matches" onPress={() => navigation.navigate('Matches')} />
    </View>
  );
} 