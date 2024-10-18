import React from 'react';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../core/store/store';

const ProfileScreen = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>User Profile</Text>
      <Text>{user ? `Welcome, ${user}` : 'Not logged in'}</Text>
    </View>
  );
};

export default ProfileScreen;
