import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  View,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import { fetchRecipeDetails, fetchRecipeInstructions } from "../api";
import { Card, Snackbar } from "react-native-paper";
import { app } from "../firebaseConfig";
import {
  getDatabase,
  ref,
  push,
  remove,
  onValue,
  get,
  set,
} from "firebase/database";
import RecipeInstructions from "./RecipeInstructions";
import { useAuthentication } from "../contexts/AuthenticationContext";
import FavoriteButton from "./FavoriteButton";
import GroceryButton from "./GroceryButton";
import InstructionsButton from "./InstructionsButton";
import RecipeInfo from "./RecipeInfo";
import RecipeNutrition from "./RecipeNutrition";
import RecipeIngredients from "./RecipeIngredients";

// Database initialization
const database = getDatabase(app);

export default function RecipeDetails({ route, navigation }) {
  const userId = useAuthentication().userId;

  // Extract recipe from the navigation route
  const { recipe } = route.params;

  const [recipeDetails, setRecipeDetails] = useState({});
  const [recipeInstructions, setRecipeInstructions] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteId, setFavoriteId] = useState("");
  const [showInstructions, setShowInstructions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Fetch the recipe details from the API
  const fetchRecipeDetailsApi = (id) => {
    fetchRecipeDetails(id)
      .then((data) => {
        setRecipeDetails(data);
        navigation.setOptions({ title: data.title });
      })
      .catch((error) => console.error("Error fetching recipe details:", error));
  };

  // Fetch the recipe instructions from the API
  const fetchRecipeInstructionsApi = (id) => {
    fetchRecipeInstructions(id)
      .then((data) => {
        setRecipeInstructions(data);
      })
      .catch((error) =>
        console.error("Error fetching recipe instructions:", error)
      );
  };

  // Handle saving or removing a recipe from the user's favorites
  const handleSaveFavorite = () => {
    if (!isFavorite) {
      // Add the recipe to favorites if not already a favorite
      const newFavoriteRef = push(
        ref(database, "users/" + userId + "/favorites"),
        recipeDetails
      );
      setIsFavorite(true);
      setFavoriteId(newFavoriteRef.key);
    } else {
      // Remove the recipe from favorites if already a favorite
      remove(ref(database, "users/" + userId + `/favorites/${favoriteId}`));
      setIsFavorite(false);
      setFavoriteId("");
    }
  };

  // Check if the current recipe is already in the user's favorites list
  const checkIfIsFavorite = () => {
    const favoritesReference = ref(database, "users/" + userId + "/favorites");
    // Use the onValue listener to check for changes in the favorites list
    onValue(favoritesReference, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const favoritesList = Object.values(data);
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
        setIsFavorite(false);
      }
    });
  };

  // Toggle the visibility of the recipe instructions
  const handleShowInstructions = () => {
    setShowInstructions(!showInstructions);
  };

  useEffect(() => {
    fetchRecipeDetailsApi(recipe.id);
    fetchRecipeInstructionsApi(recipe.id);
    checkIfIsFavorite();
  }, [recipe.id]);

  // Handle adding ingredients to the user's grocery list
  const handleAddToGroceryList = async (ingredients) => {
    setIsLoading(true);
    try {
      for (let i = 0; i < ingredients.length; i++) {
        const ingredient = ingredients[i];
        let isInList = await checkIngredientInGroceryList(ingredient);
        if (!isInList) {
          // Add the ingredient to grocery list if not already in it
          push(ref(database, "users/" + userId + "/groceries/"), {
            id: ingredient.id,
            name: ingredient.nameClean,
            amount: ingredient.measures.metric.amount,
            unit: ingredient.measures.metric.unitLong,
          });
        } else {
          // If ingredient is already in list, update the amount
          const groceriesReference = ref(
            database,
            "users/" + userId + "/groceries"
          );
          // Retrieve groceries list from database
          // Chooses get() instead of onValue() to avoid multiple calls to the database
          // and there is no need to keep the UI up to date with the DB in this case
          get(groceriesReference)
            .then((snapshot) => {
              const data = snapshot.val();
              const groceriesList = Object.values(data);
              const ingredientInList = groceriesList.find(
                (item) => item.id === ingredient.id
              );
              const updatedAmount =
                ingredientInList.amount + ingredient.measures.metric.amount;
              const groceryKey = Object.keys(data).find(
                (key) => data[key].id === ingredient.id
              );
              set(
                ref(database, "users/" + userId + `/groceries/${groceryKey}`),
                {
                  ...ingredientInList,
                  amount: updatedAmount,
                }
              );
            })
            .catch((error) => {
              console.error(
                "Error updating ingredient in grocery list:",
                error
              );
            });
        }
      }
      setSnackbarVisible(true);
      setSnackbarMessage("Grocery list updated successfully!");
    } catch (error) {
      console.error("Error adding ingredients to grocery list:", error);
      setSnackbarVisible(true);
      setSnackbarMessage("An error occurred while updating the list.");
    } finally {
      setIsLoading(false);
    }
  };

  // Check if ingredient is already in the grocery list
  const checkIngredientInGroceryList = (ingredient) => {
    // Use of promise to handle async operation. Without, the function would return before the async operation is completed
    // leading to an undefined value instead of the expected boolean
    return new Promise((resolve, reject) => {
      const groceriesReference = ref(
        database,
        "users/" + userId + "/groceries"
      );
      // Use get() instead of onValue() because only need to retrieve the data once
      get(groceriesReference)
        .then((snapshot) => {
          const data = snapshot.val();
          if (data) {
            const groceriesList = Object.values(data);
            const ingredientInList = groceriesList.find(
              (item) => item.id === ingredient.id
            );
            // COnvert ingredient to boolean to return true or false depending if ingredient has been found
            resolve(!!ingredientInList);
          } else {
            resolve(false);
          }
        })
        .catch((error) => {
          console.error("Error checking ingredient in grocery list:", error);
          // Reject the promise if an error occurs
          reject(error);
        });
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Recipe image card */}
        <Card style={styles.card}>
          <Card.Cover source={{ uri: recipe.image }} resizeMode="cover" />
        </Card>

        <View>
          {/* Favorite button to add/remove from favorites */}
          <FavoriteButton
            isFavorite={isFavorite}
            handleSaveFavorite={handleSaveFavorite}
          />
          {/* Grocery button to add ingredients to grocery list */}
          <GroceryButton
            handleAddToGroceryList={handleAddToGroceryList}
            ingredients={recipeDetails.extendedIngredients}
          />
          {/* Instructions button to toggle showing recipe instructions */}
          <InstructionsButton
            showInstructions={showInstructions}
            handleShowInstructions={handleShowInstructions}
          />
          {/* Recipe instructions section */}
          {showInstructions && (
            <RecipeInstructions instructions={recipeInstructions} />
          )}
        </View>

        {/* General information section */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>General information</Text>
            <RecipeInfo recipeDetails={recipeDetails} />
          </Card.Content>
        </Card>

        {/* Nutrition information section */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Nutrition</Text>
            <RecipeNutrition recipeDetails={recipeDetails} />
          </Card.Content>
        </Card>

        {/* Ingredients list section */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Ingredients</Text>
            <RecipeIngredients recipeDetails={recipeDetails} />
          </Card.Content>
        </Card>
      </ScrollView>

      {/* Loading indicator or Snackbar for feedback */}
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Snackbar
            visible={snackbarVisible}
            onDismiss={() => setSnackbarVisible(false)}
            duration={3000} // Snackbar duration (in ms)
          >
            {snackbarMessage}
          </Snackbar>
        )}
      </View>
    </View>
  );
}

// Styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  card: {
    marginBottom: 16,
    elevation: 4, // Add shadow effect to the card
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
