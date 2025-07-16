import React, { useEffect, useState, useRef } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, Animated } from 'react-native';
import api from '../services/api';
import { LinearGradient } from 'expo-linear-gradient';

export default function FriendsScreen() {
  const [friends, setFriends] = useState([]);
  const [email, setEmail] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    api.get('/friends').then(res => setFriends(res.data));
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const addFriend = async () => {
    await api.post('/friends/add', { email });
    setEmail('');
    const res = await api.get('/friends');
    setFriends(res.data);
  };

  return (
    <LinearGradient colors={['#F7971E', '#FFD200', '#21D4FD']} style={styles.gradient}>
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>        
        <Text style={styles.title}>👫 Friends</Text>
        <TextInput
          placeholder="Friend's Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          placeholderTextColor="#888"
        />
        <Button title="Add Friend" color="#7F7FD5" onPress={addFriend} />
        <FlatList
          data={friends}
          keyExtractor={item => item._id}
          renderItem={({ item }) => <Text style={styles.friend}>{item.name} ({item.email})</Text>}
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
    color: '#F7971E',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#F0F0F0',
    marginBottom: 16,
    fontSize: 16,
  },
  friend: {
    fontSize: 17,
    color: '#7F7FD5',
    marginBottom: 10,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    padding: 8,
    textAlign: 'center',
  },
}); 