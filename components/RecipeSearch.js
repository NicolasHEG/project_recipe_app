import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, SafeAreaView, View, Text } from 'react-native';
import { Card, Title, Button } from 'react-native-paper';
import { fetchRecipes } from '../api';
import RecipesFilter from './RecipesFilter';


export default function RecipeSearch() {
  const [recipes, setRecipes] = useState([]);

  const fetchRecipesApi = () => {
    fetchRecipes()
      .then((data) => {
        if (data && data.recipes) {
          setRecipes(data.recipes);
        } else {
          console.error('No recipes');
        }
      })
      .catch((error) => console.error('Error fetching recipes:', error));
  };

  useEffect(() => {
    fetchRecipesApi();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <RecipesFilter />
      <View />
      <ScrollView contentContainerStyle={styles.container}>
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <Card key={recipe.id} style={styles.card}>
              <Card.Cover source={{ uri: recipe.image }} />
              <Card.Content>
                <Title>{recipe.title}</Title>
              </Card.Content>
              <Card.Actions>
                <Button onPress={() => console.log(`View recipe ${recipe.id}`)}>View Recipe</Button>
              </Card.Actions>
            </Card>
          ))
        ) : (
          <Text>No recipes found</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchBoxPlaceholder: {
    height: 50,
    marginBottom: 10,
    backgroundColor: '#f5f5f5', 
  },
  container: {
    padding: 10,
    paddingBottom: 40,
  },
  card: {
    marginBottom: 10,
  }
});