import React, { useEffect, useState } from 'react';
import { Image, View, SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';
import { fetchRecipeDetails, fetchRecipeInstructions } from '../api';
import { Card, Icon, useTheme } from 'react-native-paper';

export default function RecipeDetails({ route, navigation }) {
  const { recipe } = route.params;
  const theme = useTheme();

  const [recipeDetails, setRecipeDetails] = useState({});
  const [recipeInstructions, setRecipeInstructions] = useState([]);

  const fetchRecipeDetailsApi = (id) => {
    fetchRecipeDetails(id)
    .then((data) => {
      setRecipeDetails(data);
      //Change stack title to display recipe title
      navigation.setOptions({ title: data.title });
    })
    .catch((error) => console.error('Error fetching recipe details:', error));
  }

  const fetchRecipeInstructionsApi = (id) => {
    fetchRecipeInstructions(id)
    .then((data) => {
      setRecipeInstructions(data);
    })
    .catch((error) => console.error('Error fetching recipe instructions:', error));
  }

  useEffect(() => {
    fetchRecipeDetailsApi(recipe.id)
    fetchRecipeInstructionsApi(recipe.id);
  }, [recipe.id]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>

        {/* Recipe image */}
        <Card style={styles.card}>
          <Card.Cover source={{ uri: recipe.image }} resizeMode='cover'/>
        </Card>
        
        {/* Global info section */}
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.infoContainer}>
              <View style={styles.iconWrapper}>
                <Icon size={26} source="account-multiple-outline" color='black' />
                <Text style={styles.iconText}>{recipeDetails.servings} servings</Text>
              </View>
              <View style={styles.iconWrapper}>
                <Icon size={26} source="timer-outline" color='black' />
                <Text style={styles.iconText}>{recipeDetails.cookingMinutes} min</Text>
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
          </Card.Content>
        </Card> 

        {/* Ingredients */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Ingredients</Text>
            <View style={styles.ingredientsContainer}>
              {recipeDetails.extendedIngredients && recipeDetails.extendedIngredients.map((ingredient) => (
                <Text key={ingredient.id} style={styles.ingredientText}>
                  {ingredient.measures.metric.amount} {ingredient.measures.metric.unitLong} {ingredient.nameClean}
                </Text>
              ))}
            </View>
          </Card.Content>
        </Card>

        {/* Instructions */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Instructions</Text>
            <View style={styles.ingredientsContainer}>
              {recipeInstructions.length > 0 && recipeInstructions[0].steps.map((step) => (
                <Text key={step.number} style={styles.ingredientText}>
                  {step.number}. {step.step}
                </Text>
              ))}
            </View>
          </Card.Content>
        </Card>
        

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 10,
  },
  iconWrapper: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  iconText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#555',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6200ea',
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  ingredientsContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  ingredientText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  card: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
});