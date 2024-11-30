import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, SafeAreaView, View, Text } from 'react-native';
import { ActivityIndicator, Card, Title, Button } from 'react-native-paper';
import { fetchRecipes } from '../api';
import RecipesFilter from './RecipesFilter';
import { useNavigation } from '@react-navigation/native';


export default function RecipeSearch() {

  const navigation = useNavigation();
  
  const [recipes, setRecipes] = useState([]);
  const [filters, setFilters] = useState({ ingredients: '', intolerances: '', diet: '' });

  const [offset, setOffset] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

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
    // Reset offset to 1
    setOffset(1);
    setHasMore(true);
  }

  const loadMoreRecipes = () => {
    if (loading || !hasMore) {
      return;
    }

    setLoading(true);
    fetchRecipes(filters, offset + 5)
    .then((data) => {
      // Append new recipes to existing recipes
      setRecipes([...recipes, ...data.results]);
      // Update offset
      setOffset(offset + 5);
      // Check if there are more recipes to load
      setHasMore(data.results.length > 0);
    })
    .catch((error) => console.error('Error fetching more recipes:', error))
    .finally(() => setLoading(false));
  }

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Display filter component and manage filters value*/}
      <RecipesFilter onApplyFilters={pressApplyFilters}/>
      <View />
      <ScrollView 
        contentContainerStyle={styles.container}
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) {
            loadMoreRecipes();
          }
        }}
        scrollEventThrottle={400}
      >
        {recipes.map((recipe) => (
          <Card key={recipe.id} style={styles.card}>
            <Card.Cover source={{ uri: recipe.image }} />
            <Card.Content>
              <Title>{recipe.title}</Title>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => navigation.navigate('RecipeDetails', {recipe})}>View Recipe</Button>
            </Card.Actions>
          </Card>
        ))}
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
        {!loading && recipes.length === 0 && (
          <Text>No recipes found</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  searchBoxPlaceholder: {
    height: 50,
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  container: {
    padding: 15,
    paddingBottom: 40,
  },
  card: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  noRecipesText: {
    fontSize: 16,
    color: '#888888',
    textAlign: 'center',
    marginTop: 20,
  },
  activityIndicator: {
    marginTop: 20,
  },
});