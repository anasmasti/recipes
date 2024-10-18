import {useNavigation} from '@react-navigation/native';
import {Button} from 'react-native';
import {logout} from '../store/authSlice';
import {store} from '../store/store';
import {AppNavigationProp} from '../types/navigationTypes';

export const LogoutButton = () => {
  const navigation = useNavigation<AppNavigationProp>();

  const handleLogout = () => {
    store.dispatch(logout());
    navigation.navigate('Login');
  };

  return <Button onPress={handleLogout} title="Logout" color="#ff6b6b" />;
};
