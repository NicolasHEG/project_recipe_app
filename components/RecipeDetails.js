import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import { fetchRecipeDetails, fetchRecipeInstructions } from "../api";
import { Button, Card, Icon, useTheme } from "react-native-paper";
import { app } from "../firebaseConfig";
import { getDatabase, ref, push, remove, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import RecipeInstructions from "./RecipeInstructions";
import { useGrocery } from "../contexts/GroceryContext";

const database = getDatabase(app);

export default function RecipeDetails({ route, navigation }) {
  const { handleAddToGroceryList } = useGrocery();

  const userId = getAuth().currentUser.uid;

  const { recipe } = route.params;
  const theme = useTheme();

  const [recipeDetails, setRecipeDetails] = useState({});
  const [recipeInstructions, setRecipeInstructions] = useState([]);

  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteId, setFavoriteId] = useState("");

  const [showInstructions, setShowInstructions] = useState(false);

  const fetchRecipeDetailsApi = (id) => {
    fetchRecipeDetails(id)
      .then((data) => {
        setRecipeDetails(data);
        //Change stack title to display recipe title
        navigation.setOptions({ title: data.title });
      })
      .catch((error) => console.error("Error fetching recipe details:", error));
  };

  const fetchRecipeInstructionsApi = (id) => {
    fetchRecipeInstructions(id)
      .then((data) => {
        setRecipeInstructions(data);
      })
      .catch((error) =>
        console.error("Error fetching recipe instructions:", error)
      );
  };

  const handleSaveFavorite = () => {
    if (!isFavorite) {
      // Create a new referene in the database
      const newFavoriteRef = push(
        ref(database, "users/" + userId + "/favorites"),
        recipeDetails
      );
      setIsFavorite(true);
      // Retrieve favorite id from reference
      setFavoriteId(newFavoriteRef.key);
    } else {
      // Remove recipe from favorites
      remove(ref(database, "users/" + userId + `/favorites/${favoriteId}`));
      setIsFavorite(false);
      setFavoriteId("");
    }
  };

  const checkIfIsFavorite = () => {
    const favoritesReference = ref(database, "users/" + userId + "/favorites");
    onValue(favoritesReference, (snapshot) => {
      // Retrieve favorites list from database
      const data = snapshot.val();
      if (data) {
        // Retrieve favorite recipe from list
        const favoritesList = Object.values(data);
        // Check if recipe is in favorites list
        const favorite = favoritesList.find(
          (favorite) => favorite.id === recipe.id
        );

        if (favorite) {
          setIsFavorite(true);
          setFavoriteId(
            Object.keys(data).find((key) => data[key].id === recipe.id)
          );
        } else {
          setIsFavorite(false);
        }
      } else {
        // If no favorite recorded in database
        setIsFavorite(false);
      }
    });
  };

  const handleShowInstructions = () => {
    setShowInstructions(!showInstructions);
  };

  useEffect(() => {
    fetchRecipeDetailsApi(recipe.id);
    fetchRecipeInstructionsApi(recipe.id);
    checkIfIsFavorite();
  }, [recipe.id]);

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Recipe image */}
        <Card style={styles.card}>
          <Card.Cover source={{ uri: recipe.image }} resizeMode="cover" />
        </Card>

        <View>
          {!isFavorite && (
            <Button
              icon="heart-outline"
              mode="outlined"
              onPress={handleSaveFavorite}
              style={{ margin: 10, borderColor: theme.colors.primary }}
            >
              Add to favorites
            </Button>
          )}
          {isFavorite && (
            <Button
              icon="heart"
              mode="contained"
              onPress={handleSaveFavorite}
              style={{ margin: 10, backgroundColor: theme.colors.primary }}
            >
              Remove from favorites
            </Button>
          )}
          <Button
            icon="cart-outline"
            mode="contained"
            onPress={() =>
              handleAddToGroceryList(recipeDetails.extendedIngredients)
            }
            style={{ margin: 10 }}
          >
            Add to grocery list
          </Button>

          {/* Instructions */}
          {!showInstructions && (
            <Button
              icon="chef-hat"
              mode="outlined"
              onPress={handleShowInstructions}
              style={{ margin: 10, borderColor: theme.colors.primary }}
            >
              Start cooking
            </Button>
          )}

          {showInstructions && (
            <Button
              icon="chef-hat"
              mode="contained"
              onPress={handleShowInstructions}
              style={{ margin: 10, borderColor: theme.colors.primary }}
            >
              Stop cooking
            </Button>
          )}
          {showInstructions && (
            <RecipeInstructions instructions={recipeInstructions} />
          )}
        </View>
        {/* Global info section */}
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.infoContainer}>
              <View style={styles.iconWrapper}>
                <Icon
                  size={26}
                  source="account-multiple-outline"
                  color="black"
                />
                <Text style={styles.iconText}>
                  {recipeDetails.servings} servings
                </Text>
              </View>
              <View style={styles.iconWrapper}>
                <Icon size={26} source="timer-outline" color="black" />
                <Text style={styles.iconText}>
                  {recipeDetails.readyInMinutes} min
                </Text>
              </View>
            </View>

            <View style={styles.infoContainer}>
              {recipeDetails.vegan && (
                <View style={styles.iconWrapper}>
                  <Icon source="leaf" size={26} color="green" />
                  <Text style={styles.iconText}>Vegan</Text>
                </View>
              )}
              {recipeDetails.glutenFree && (
                <View style={styles.iconWrapper}>
                  <Icon source="barley-off" size={26} color="orange" />
                  <Text style={styles.iconText}>Gluten-Free</Text>
                </View>
              )}
              {recipeDetails.dairyFree && (
                <View style={styles.iconWrapper}>
                  <Icon source="cow-off" size={26} color="lightblue" />
                  <Text style={styles.iconText}>Dairy-Free</Text>
                </View>
              )}
            </View>
          </Card.Content>
        </Card>

        {/* Ingredients */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Ingredients</Text>
            <View style={styles.ingredientsContainer}>
              {recipeDetails.extendedIngredients &&
                recipeDetails.extendedIngredients.map((ingredient) => (
                  <Text key={ingredient.id} style={styles.ingredientText}>
                    {ingredient.measures.metric.amount}{" "}
                    {ingredient.measures.metric.unitLong} {ingredient.nameClean}
                  </Text>
                ))}
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 10,
  },
  iconWrapper: {
    alignItems: "center",
    marginHorizontal: 10,
  },
  iconText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#555",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#6200ea",
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  ingredientsContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  ingredientText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  card: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
});
