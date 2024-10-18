import React, {useEffect} from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import useSWR from 'swr';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {setRecipes, toggleWishlist} from '../core/store/recipesSlice';
import {Recipe} from '../core/types/Recipe';
import {RootState} from '../core/store/store';

const fetcher = (url: string) => axios.get(url).then(res => res.data.recipes);

const RecipesListScreen = ({navigation}: any) => {
  const dispatch = useDispatch();
  const {data: recipesData, error} = useSWR(
    `${process.env.API_URL}${process.env.RECIPES_ENDPOINT}`,
    fetcher,
  );

  const wishlist = useSelector((state: RootState) => state.recipes.wishlist);
  const recipes = useSelector((state: RootState) => state.recipes.list);

  useEffect(() => {
    if (recipesData) {
      dispatch(setRecipes(recipesData));
    }
  }, [recipesData, dispatch]);

  if (error) return <Text>Error loading recipes...</Text>;
  if (!recipes.length) return <Text>Loading...</Text>;

  const handleRecipePress = (recipe: Recipe) => {
    navigation.navigate('Recipe Detail', {recipeId: recipe.id});
  };

  const handleWishlistToggle = (recipe: Recipe) => {
    dispatch(toggleWishlist(recipe));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={recipes}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.recipeCard}
            onPress={() => handleRecipePress(item)}>
            <Image source={{uri: item.image}} style={styles.recipeImage} />
            <Text style={styles.recipeTitle}>{item.name}</Text>
            <TouchableOpacity
              style={[
                styles.wishlistButton,
                wishlist.some(wishItem => wishItem.id === item.id) &&
                  styles.wishlistActive,
              ]}
              onPress={() => handleWishlistToggle(item)}>
              <Text style={styles.wishlistButtonText}>
                {wishlist.some(wishItem => wishItem.id === item.id)
                  ? 'Remove from Wishlist'
                  : 'Add to Wishlist'}
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  recipeCard: {
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  recipeImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  wishlistButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    alignItems: 'center',
  },
  wishlistButtonText: {
    color: '#fff',
  },
  wishlistActive: {
    backgroundColor: '#FF4136',
  },
});

export default RecipesListScreen;
