import React from "react";
import { View, Text } from "react-native";

export default function RecipeIngredients({ recipeDetails, styles }) {
  return (
    <View style={styles.ingredientsContainer}>
      {recipeDetails.extendedIngredients &&
        recipeDetails.extendedIngredients.map((ingredient) => (
          <Text key={ingredient.id} style={styles.ingredientText}>
            {ingredient.measures.metric.amount} {ingredient.measures.metric.unitLong} {ingredient.nameClean}
          </Text>
        ))}
    </View>
  );
}