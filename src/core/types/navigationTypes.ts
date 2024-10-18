import {DrawerNavigationProp} from '@react-navigation/drawer';

export type RootStackParamList = {
  Login: undefined;
  Recipes: undefined;
  Profile: undefined;
  Wishlist: undefined;
};

export type AppNavigationProp = DrawerNavigationProp<RootStackParamList>;
