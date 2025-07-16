import React, { useEffect, useState, useRef } from 'react';
import { View, FlatList, Text, StyleSheet, Animated } from 'react-native';
import api from '../services/api';
import { LinearGradient } from 'expo-linear-gradient';

export default function MatchesScreen() {
  const [matches, setMatches] = useState([]);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    api.get('/matches').then(res => setMatches(res.data));
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <LinearGradient colors={['#7F7FD5', '#86A8E7', '#91EAE4']} style={styles.gradient}>
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>        
        <Text style={styles.title}>🎉 Matches</Text>
        <FlatList
          data={matches}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <View style={styles.matchCard}>
              <Text style={styles.movieId}>🎬 {item.movieId}</Text>
              <Text style={styles.matchedWith}>Matched with: {item.users.map(u => u.name).join(', ')}</Text>
            </View>
          )}
          style={{ marginTop: 24, width: '100%' }}
        />
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    margin: 24,
    padding: 24,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.95)',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#7F7FD5',
    marginBottom: 24,
  },
  matchCard: {
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    alignItems: 'center',
  },
  movieId: {
    fontSize: 18,
    color: '#F7971E',
    fontWeight: 'bold',
    marginBottom: 6,
  },
  matchedWith: {
    fontSize: 16,
    color: '#7F7FD5',
  },
}); 