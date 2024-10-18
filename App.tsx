import React, {useEffect} from 'react';
import {Provider, useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {loadWishlist} from './core/store/recipesSlice';
import ProfileScreen from './src/screens/ProfileScreen';
import RecipesListScreen from './src/screens/RecipesListScreen';
import WishlistScreen from './src/screens/WishlistScreen';
import LoginScreen from './src/screens/LoginScreen';
import RecipeDetailScreen from './src/screens/RecipeDetailScreen';
import SplashScreen from 'react-native-splash-screen';
import {LogoutButton} from './core/components/LogoutButton';
import {RootState, store} from './core/store/store';

const Drawer = createDrawerNavigator();

const App = () => {
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    store.dispatch(loadWishlist());

    const timer = setTimeout(() => {
      SplashScreen.hide();
    }, 2000);

    return () => clearTimeout(timer);
  });

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName={token ? 'Recipes' : 'Login'}>
        {token && (
          <>
            <Drawer.Screen
              name="Profile"
              options={{headerRight: LogoutButton}}
              component={ProfileScreen}
            />
            <Drawer.Screen
              name="Recipes"
              options={{headerRight: LogoutButton}}
              component={RecipesListScreen}
            />
            <Drawer.Screen
              name="Wishlist"
              options={{headerRight: LogoutButton}}
              component={WishlistScreen}
            />
            <Drawer.Screen
              name="Recipe Detail"
              component={RecipeDetailScreen}
              options={{
                drawerItemStyle: {display: 'none'},
                headerRight: LogoutButton,
              }}
            />
          </>
        )}

        <Drawer.Screen
          name="Login"
          options={{
            drawerItemStyle: {display: 'none'},
          }}
          component={LoginScreen}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const MainApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default MainApp;
