import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RecipesState, Recipe} from '../types/Recipe';
import {AppDispatch} from './store';

const initialState: RecipesState = {
  list: [],
  wishlist: [],
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    setRecipes(state, action: PayloadAction<Recipe[]>) {
      state.list = action.payload;
    },
    setWishlist(state, action: PayloadAction<Recipe[]>) {
      state.wishlist = action.payload;
    },
    toggleWishlist(state, action: PayloadAction<Recipe>) {
      const recipe = action.payload;
      const index = state.wishlist.findIndex(r => r.id === recipe.id);
      if (index !== -1) {
        state.wishlist.splice(index, 1);
      } else {
        state.wishlist.push(recipe);
      }
      AsyncStorage.setItem('wishlist', JSON.stringify(state.wishlist));
    },
  },
});

export const loadWishlist = () => async (dispatch: AppDispatch) => {
  const wishlistData = await AsyncStorage.getItem('wishlist');
  if (wishlistData) {
    dispatch(setWishlist(JSON.parse(wishlistData)));
  }
};

export const {setRecipes, toggleWishlist, setWishlist} = recipesSlice.actions;
export default recipesSlice.reducer;
