import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import { fetchRecipeDetails, fetchRecipeInstructions } from "../api";
import { Card } from "react-native-paper";
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

const database = getDatabase(app);

export default function RecipeDetails({ route, navigation }) {
  const userId = useAuthentication().userId;
  const { recipe } = route.params;

  const [recipeDetails, setRecipeDetails] = useState({});
  const [recipeInstructions, setRecipeInstructions] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteId, setFavoriteId] = useState("");
  const [showInstructions, setShowInstructions] = useState(false);

  const fetchRecipeDetailsApi = (id) => {
    fetchRecipeDetails(id)
      .then((data) => {
        setRecipeDetails(data);
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
      const newFavoriteRef = push(
        ref(database, "users/" + userId + "/favorites"),
        recipeDetails
      );
      setIsFavorite(true);
      setFavoriteId(newFavoriteRef.key);
    } else {
      remove(ref(database, "users/" + userId + `/favorites/${favoriteId}`));
      setIsFavorite(false);
      setFavoriteId("");
    }
  };

  const checkIfIsFavorite = () => {
    const favoritesReference = ref(database, "users/" + userId + "/favorites");
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

  const handleShowInstructions = () => {
    setShowInstructions(!showInstructions);
  };

  useEffect(() => {
    fetchRecipeDetailsApi(recipe.id);
    fetchRecipeInstructionsApi(recipe.id);
    checkIfIsFavorite();
  }, [recipe.id]);

  const handleAddToGroceryList = async (ingredients) => {
    for (let i = 0; i < ingredients.length; i++) {
      const ingredient = ingredients[i];
      let isInList = await checkIngredientInGroceryList(ingredient);
      if (!isInList) {
        push(ref(database, "users/" + userId + "/groceries/"), {
          id: ingredient.id,
          name: ingredient.nameClean,
          amount: ingredient.measures.metric.amount,
          unit: ingredient.measures.metric.unitLong,
        });
      } else {
        const groceriesReference = ref(
          database,
          "users/" + userId + "/groceries"
        );
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
            set(ref(database, "users/" + userId + `/groceries/${groceryKey}`), {
              ...ingredientInList,
              amount: updatedAmount,
            });
          })
          .catch((error) => {
            console.error("Error updating ingredient in grocery list:", error);
          });
      }
    }
  };

  const checkIngredientInGroceryList = (ingredient) => {
    return new Promise((resolve, reject) => {
      const groceriesReference = ref(
        database,
        "users/" + userId + "/groceries"
      );
      get(groceriesReference)
        .then((snapshot) => {
          const data = snapshot.val();
          if (data) {
            const groceriesList = Object.values(data);
            const ingredientInList = groceriesList.find(
              (item) => item.id === ingredient.id
            );
            resolve(!!ingredientInList);
          } else {
            resolve(false);
          }
        })
        .catch((error) => {
          console.error("Error checking ingredient in grocery list:", error);
          reject(error);
        });
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Card style={styles.card}>
          <Card.Cover source={{ uri: recipe.image }} resizeMode="cover" />
        </Card>

        <View>
          <FavoriteButton
            isFavorite={isFavorite}
            handleSaveFavorite={handleSaveFavorite}
          />
          <GroceryButton
            handleAddToGroceryList={handleAddToGroceryList}
            ingredients={recipeDetails.extendedIngredients}
          />
          <InstructionsButton
            showInstructions={showInstructions}
            handleShowInstructions={handleShowInstructions}
          />
          {showInstructions && (
            <RecipeInstructions instructions={recipeInstructions} />
          )}
        </View>

        <Card style={styles.card}>
          <Card.Content>
            <RecipeInfo recipeDetails={recipeDetails} styles={styles} />
            <RecipeNutrition recipeDetails={recipeDetails} styles={styles} />
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Ingredients</Text>
            <RecipeIngredients recipeDetails={recipeDetails} styles={styles} />
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
  },
  card: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
});
