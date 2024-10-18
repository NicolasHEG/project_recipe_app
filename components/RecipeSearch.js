import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, SafeAreaView, View, Text } from 'react-native';
import { Card, Title, Button } from 'react-native-paper';
import { fetchRecipes } from '../api';
import RecipesFilter from './RecipesFilter';


export default function RecipeSearch() {

  const [recipes, setRecipes] = useState([]);
  const [filters, setFilters] = useState({ ingredients: '', intolerances: '', diet: '' });

  const fetchRecipesApi = (filters) => {
    fetchRecipes(filters)
      .then((data) => {
        setRecipes(data.results);
      })
      .catch((error) => console.error('Error fetching recipes:', error));
  };

  useEffect(() => {
    fetchRecipesApi(filters);
  }, [filters]); // Dependency array

  // Set filters from filter component
  const pressApplyFilters = (filters) => {
    setFilters(filters);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Display filter component and manage filters value*/}
      <RecipesFilter onApplyFilters={pressApplyFilters}/>
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