import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {toggleWishlist} from '../../core/store/recipesSlice';
import {RootState} from '../../core/store/store';

const WishlistScreen = ({navigation}: any) => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state: RootState) => state.recipes.wishlist);
  const recipes = useSelector((state: RootState) => state.recipes.list);

  const wishlistRecipes = recipes.filter(recipe =>
    wishlist.some(wishItem => wishItem.id === recipe.id),
  );

  const handleRemoveFromWishlist = (recipe: any) => {
    dispatch(toggleWishlist(recipe));
  };

  return (
    <View style={styles.container}>
      {wishlistRecipes.length > 0 ? (
        <FlatList
          data={wishlistRecipes}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View style={styles.recipeCard}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Recipe Detail', {recipeId: item.id})
                }>
                <Image source={{uri: item.image}} style={styles.recipeImage} />
                <Text style={styles.recipeTitle}>{item.name}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemoveFromWishlist(item)}>
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <Text style={styles.emptyMessage}>Your wishlist is empty.</Text>
      )}
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
  emptyMessage: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
  },
  removeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#FF4136',
    borderRadius: 5,
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#fff',
  },
});

export default WishlistScreen;
