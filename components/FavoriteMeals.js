import React, { useEffect, useState } from "react";
import { Text, StyleSheet, FlatList } from "react-native";
import { app } from "../firebaseConfig";
import { getDatabase, onValue, ref } from "firebase/database";
import { useNavigation } from "@react-navigation/native";
import { Button, Card, Title } from "react-native-paper";
import { useAuthentication } from "../contexts/AuthenticationContext";

// Initialize database once only
const database = getDatabase(app);

// Component to display user's favorite meals, retrieved from database
export default function FavoriteMeals() {
  // Retrieve ID from Authentication context
  const userId = useAuthentication().userId;

  const navigation = useNavigation();

  const [favorites, setFavorites] = useState([]);

  // Fetch favorite meals for the authenticated user on component mount
  useEffect(() => {
    try {
      const favoritesRef = ref(database, "users/" + userId + "/favorites");
      onValue(favoritesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const favoritesList = Object.values(data);
          setFavorites(favoritesList);
        } else {
          setFavorites([]);
        }
      });
    } catch (error) {
      console.error("Error fetching favorite meals: ", error);
    }
  }, []);

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
    <FlatList
      data={favorites}
      // Use index as key for each item
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderRecipe}
      contentContainerStyle={styles.container}
      ListEmptyComponent={<Text>No favorite recipes found</Text>}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingBottom: 40,
  },
  card: {
    marginBottom: 10,
  },
});
