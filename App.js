import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { BottomNavigation, PaperProvider } from 'react-native-paper';
import RecipeSearch from './components/RecipeSearch';
import GroceryList from './components/GroceryList';
import FavoriteMeals from './components/FavoriteMeals';

export default function App() {

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'recipeSearch', title: 'Recipes', focusedIcon: 'text-box-search', unfocusedIcon: 'text-box-search-outline' },
    { key: 'favoriteMeals', title: 'Favorites', focusedIcon: 'heart', unfocusedIcon: 'heart-outline' },
    { key: 'groceryList', title: 'Groceries', focusedIcon: 'cart', unfocusedIcon: 'cart-outline' },
  ]);

  // Map routes with components
  const renderScene = BottomNavigation.SceneMap({
    recipeSearch: RecipeSearch,
    favoriteMeals: FavoriteMeals,
    groceryList: GroceryList,
  });

  return (
    <PaperProvider>
      <NavigationContainer>
        <BottomNavigation
          navigationState={{ index, routes }}
          onIndexChange={setIndex}
          renderScene={renderScene}
        />
      </NavigationContainer>
    </PaperProvider>
  );
}

