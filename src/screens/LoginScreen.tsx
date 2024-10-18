import React, {useState} from 'react';
import {View, TextInput, Button, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import {setUser, setToken} from '../../core/store/authSlice';

const LoginScreen = ({navigation}: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // {username: 'emilys', password: 'emilyspass'}
  const handleLogin = async () => {
    if (!password && !username) return;

    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.API_URL}${process.env.AUTH_ENDPOINT}`,
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({username: 'emilys', password: 'emilyspass'}),
        },
      );

      const data = await response.json();

      if (data.accessToken) {
        dispatch(setUser(username));
        dispatch(setToken(data.accessToken));
        navigation.navigate('Recipes');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Text>Loading...</Text>;

  return (
    <View style={{padding: 20}}>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={{borderWidth: 1, marginBottom: 10, padding: 8}}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{borderWidth: 1, marginBottom: 10, padding: 8}}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
