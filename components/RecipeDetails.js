import React from 'react';
import { Text } from 'react-native';

export default function RecipeDetails({ route }) {
  const { recipe } = route.params;

  return (
    <Text>Hello</Text>
  );
}

