import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Icon } from "react-native-paper";

export default function RecipeInfo({ recipeDetails }) {
  return (
    <View>
      <View style={styles.infoContainer}>
        <View style={styles.iconWrapper}>
          <Icon size={26} source="account-multiple-outline" color="black" />
          <Text style={styles.iconText}>{recipeDetails.servings} servings</Text>
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
