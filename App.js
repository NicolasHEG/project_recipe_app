import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Appbar, BottomNavigation, PaperProvider } from 'react-native-paper';
import RecipeSearch from './components/RecipeSearch';
import GroceryList from './components/GroceryList';
import FavoriteMeals from './components/FavoriteMeals';
import RecipeDetails from './components/RecipeDetails'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './components/Login';
import Register from './components/Register';

const Stack = createNativeStackNavigator();

/**
 * Component to handle bottom tab navigation
 */
function BottomTabNavigator({ navigation, back }) {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'recipeSearch', title: 'Recipes', focusedIcon: 'text-box-search', unfocusedIcon: 'text-box-search-outline' },
    { key: 'favoriteMeals', title: 'Favorites', focusedIcon: 'heart', unfocusedIcon: 'heart-outline' },
    { key: 'groceryList', title: 'Groceries', focusedIcon: 'cart', unfocusedIcon: 'cart-outline' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    // First screen is the default
    recipeSearch: RecipeSearch,
    favoriteMeals: FavoriteMeals,
    groceryList: GroceryList,
  });

  return (
    <PaperProvider>
      <Appbar.Header>
        <Appbar.Content title="What's in my fridge" />
        <Appbar.Action icon="account" />
      </Appbar.Header>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </PaperProvider>
  );
}

/**
 * Component to handle stack navigation
 */
function CustomStackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }} />
      <Stack.Screen name="Register" component={Register} />
      {/* Bottom Tabs */}
      <Stack.Screen name="BottomNavigation" component={BottomTabNavigator} options={{ headerShown: false, title: '' }} />
      {/* Stack Navigation for Recipe Detail */}
      <Stack.Screen name="RecipeDetails" component={RecipeDetails} options={{ title: '' }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (      
    <NavigationContainer>
      <CustomStackNavigation />
    </NavigationContainer>
  );
}
