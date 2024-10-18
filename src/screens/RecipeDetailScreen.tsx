import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import useSWR from 'swr';
import axios from 'axios';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

const RecipeDetailScreen = ({route}: any) => {
  const {recipeId} = route.params;
  const {data: recipe, error} = useSWR(
    `${process.env.API_URL}${process.env.RECIPE_ENDPOINT}/${recipeId}`,
    fetcher,
  );

  if (error) return <Text>Error loading recipe details...</Text>;
  if (!recipe) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Image source={{uri: recipe.image}} style={styles.image} />
      <Text style={styles.title}>{recipe.name}</Text>
      <Text style={styles.subtitle}>Ingredients:</Text>
      {recipe.ingredients.map((ingredient: string, index: number) => (
        <Text key={index}>- {ingredient}</Text>
      ))}
      <Text style={styles.subtitle}>Instructions:</Text>
      {recipe.instructions.map((instruction: string, index: number) => (
        <Text key={index}>- {instruction}</Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
  },
});

export default RecipeDetailScreen;
