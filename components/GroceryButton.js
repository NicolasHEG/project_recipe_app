import React from "react";
import { Button } from "react-native-paper";

export default function GroceryButton({ handleAddToGroceryList, ingredients }) {
  return (
    <Button
      icon="cart-outline"
      mode="contained"
      onPress={() => handleAddToGroceryList(ingredients)}
      style={{ margin: 10 }}
    >
      Add to grocery list
    </Button>
  );
}
