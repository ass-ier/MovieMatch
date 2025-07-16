import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';
import api from '../services/api';

export default function FriendsScreen() {
  const [friends, setFriends] = useState([]);
  const [email, setEmail] = useState('');

  useEffect(() => {
    api.get('/friends').then(res => setFriends(res.data));
  }, []);

  const addFriend = async () => {
    await api.post('/friends/add', { email });
    setEmail('');
    const res = await api.get('/friends');
    setFriends(res.data);
  };

  return (
    <View>
      <TextInput placeholder="Friend's Email" value={email} onChangeText={setEmail} />
      <Button title="Add Friend" onPress={addFriend} />
      <FlatList
        data={friends}
        keyExtractor={item => item._id}
        renderItem={({ item }) => <Text>{item.name} ({item.email})</Text>}
      />
    </View>
  );
} 