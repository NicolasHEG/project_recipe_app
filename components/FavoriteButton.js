import React from "react";
import { Button } from "react-native-paper";

export default function FavoriteButton({ isFavorite, handleSaveFavorite }) {
  return (
    <Button
      icon={isFavorite ? "heart" : "heart-outline"}
      mode={isFavorite ? "contained" : "outlined"}
      onPress={handleSaveFavorite}
      style={{ margin: 10 }}
    >
      {isFavorite ? "Remove from favorites" : "Add to favorites"}
    </Button>
  );
}
