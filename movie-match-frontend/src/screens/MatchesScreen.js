import React, { useEffect, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import api from '../services/api';

export default function MatchesScreen() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    api.get('/matches').then(res => setMatches(res.data));
  }, []);

  return (
    <View>
      <FlatList
        data={matches}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <View>
            <Text>Movie ID: {item.movieId}</Text>
            <Text>Matched with: {item.users.map(u => u.name).join(', ')}</Text>
          </View>
        )}
      />
    </View>
  );
} 