import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput, Card } from 'react-native-paper';

export default function RecipesFilter() {
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [ingredients, setIngredients] = useState('');
  const [intolerances, setIntolerances] = useState('');
  const [diet, setDiet] = useState('');

  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible);
  };

  const applyFilters = () => {
    
  }

  return (
    <View style={styles.container}>
      <Button mode="contained" onPress={toggleFilters}>
        {/* Toggle filter section button label */}
        {filtersVisible ? 'Hide Filters' : 'Show Filters'}
      </Button>

      {/* Filters section */}
      {filtersVisible && (
        <Card style={styles.filterSection}>
          {/* TextInput for ingredients included in the recipe */}
          <TextInput
            label="Ingredients"
            value={ingredients}
            onChangeText={text => setIngredients(text)}
            mode="outlined"
            style={styles.input}
            placeholder="e.g., chicken, tomato"
          />

          {/* TextInput to filter recipe by intolerances */}
          <TextInput
            label="Intolerances"
            value={intolerances}
            onChangeText={text => setIntolerances(text)}
            mode="outlined"
            style={styles.input}
            placeholder="e.g., gluten, dairy"
          />

          {/* TextInput for recipes based on a specific diet (vegan, lactose free, gluten, free...) */}
          <TextInput
            label="Specific diet"
            value={diet}
            onChangeText={text => setDiet(text)}
            mode="outlined"
            style={styles.input}
            placeholder="e.g., vegan, lactose free"
          />
          
          <Button mode="contained" onPress={applyFilters}>
            Apply Filters
          </Button>
        </Card>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  filterSection: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  input: {
    marginBottom: 10,
  },
});

