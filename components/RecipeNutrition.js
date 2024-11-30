import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Icon } from "react-native-paper";

export default function RecipeNutrition({ recipeDetails }) {
  // Get the nutrition data from the recipe details or set it to an empty array
  const nutrients = recipeDetails.nutrition
    ? recipeDetails.nutrition.nutrients
    : [];
  // Get the amount of a nutrient
  const getNutrient = (name) =>
    nutrients.find((nutrient) => nutrient.name === name)?.amount.toFixed(0) ||
    0;

  return (
    <View style={styles.infoContainer}>
      <View style={styles.iconWrapper}>
        <Icon source="fire" size={26} color="red" />
        <Text style={styles.iconText}>{getNutrient("Calories")} kcal</Text>
      </View>
      <View style={styles.iconWrapper}>
        <Icon source="oil" size={26} color="black" />
        <Text style={styles.iconText}>{getNutrient("Fat")} g</Text>
      </View>
      <View style={styles.iconWrapper}>
        <Icon source="egg" size={26} color="#EDE8D0" />
        <Text style={styles.iconText}>{getNutrient("Protein")} g</Text>
      </View>
      <View style={styles.iconWrapper}>
        <Icon source="bread-slice" size={26} color="brown" />
        <Text style={styles.iconText}>{getNutrient("Carbohydrates")} g</Text>
      </View>
      <View style={styles.iconWrapper}>
        <Icon source="candy-outline" size={26} color="red" />
        <Text style={styles.iconText}>{getNutrient("Sugar")} g</Text>
      </View>
      <View style={styles.iconWrapper}>
        <Icon source="shaker-outline" size={26} color="black" />
        <Text style={styles.iconText}>{getNutrient("Sodium")} mg</Text>
      </View>
      <View style={styles.iconWrapper}>
        <Icon source="food-apple" size={26} color="green" />
        <Text style={styles.iconText}>{getNutrient("Fiber")} g</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
