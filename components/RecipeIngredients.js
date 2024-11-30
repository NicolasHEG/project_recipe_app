import React from "react";
import { View, StyleSheet, Text } from "react-native";

export default function RecipeIngredients({ recipeDetails }) {
  return (
    <View style={styles.ingredientsContainer}>
      {recipeDetails.extendedIngredients &&
        recipeDetails.extendedIngredients.map((ingredient) => (
          <View key={ingredient.id} style={styles.ingredientCard}>
            <Text style={styles.ingredientText}>
              {ingredient.measures.metric.amount} {ingredient.measures.metric.unitLong}
            </Text>
            <Text style={styles.ingredientName}>{ingredient.nameClean}</Text>
          </View>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  ingredientsContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  ingredientCard: {
    backgroundColor: "#f9f9f9",
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ingredientText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  ingredientName: {
    fontSize: 14,
    color: "#555",
    fontStyle: "italic",
  },
});
