import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, SafeAreaView, Text } from "react-native";
import { ActivityIndicator, Card, Title, Button } from "react-native-paper";
import { FlatList } from "react-native";
import { fetchRecipes } from "../api";
import RecipesFilter from "./RecipesFilter";
import { useNavigation } from "@react-navigation/native";

export default function RecipeSearch() {
  const navigation = useNavigation();

  const [recipes, setRecipes] = useState([]);
  const [filters, setFilters] = useState({
    ingredients: "",
    intolerances: "",
    diet: "",
  });
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const [error, setError] = useState(null);

  // useCallback is used to memoize the function and prevent unnecessary re-renders
  const fetchRecipesApi = useCallback(
    async (filters, newOffset = 0, append = false) => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchRecipes(filters, newOffset);
        setRecipes((prev) =>
          append ? [...prev, ...data.results] : data.results
        );
        setHasMore(data.results.length > 0);
        setOffset(newOffset);
      } catch (err) {
        console.error("Error fetching recipes:", err);
        setError("Failed to load recipes. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchRecipesApi(filters);
  }, [filters, fetchRecipesApi]);

  // Load more recipes when user scrolls to the end of the list
  const handleLoadMore = () => {
    if (!loading && hasMore) {
      fetchRecipesApi(filters, offset + 5, true);
    }
  };

  // Update filters and reset offset when new filters are applied
  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    setOffset(1);
    setHasMore(true);
  };

  // Define how recipes will be rendered in the FlatList
  const renderRecipe = ({ item }) => (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: item.image }} />
      <Card.Content>
        <Title>{item.title}</Title>
      </Card.Content>
      <Card.Actions>
        <Button
          onPress={() => navigation.navigate("RecipeDetails", { recipe: item })}
        >
          View Recipe
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <RecipesFilter onApplyFilters={handleApplyFilters} />
      {error && <Text style={styles.errorText}>{error}</Text>}
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderRecipe}
        contentContainerStyle={styles.container}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading && <ActivityIndicator size="large" color="#0000ff" />
        }
        ListEmptyComponent={
          !loading && <Text style={styles.noRecipesText}>No recipes found</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  searchBoxPlaceholder: {
    height: 50,
    marginBottom: 10,
    backgroundColor: "#f5f5f5",
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
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  noRecipesText: {
    fontSize: 16,
    color: "#888888",
    textAlign: "center",
    marginTop: 20,
  },
  activityIndicator: {
    marginTop: 20,
  },
});
