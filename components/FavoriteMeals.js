import React, { useEffect, useState } from 'react';
import { Image, View, Text, FlatList, StyleSheet, ScrollView } from 'react-native';
import { app } from '../firebaseConfig';
import { get, getDatabase, onValue, ref } from "firebase/database";
import { useNavigation } from '@react-navigation/native';
import { Button, Card, Title } from 'react-native-paper';
import { getAuth } from 'firebase/auth';

const database = getDatabase(app);

export default function FavoriteMeals() {
    const userId = getAuth().currentUser.uid;

    const navigation = useNavigation();

    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const favoritesRef = ref(database, "users/" + userId + '/favorites');
        onValue(favoritesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const favoritesList = Object.values(data);
                setFavorites(favoritesList);
            }else{
                setFavorites([]);
            }
        });
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {favorites.length > 0 ? (
                favorites.map((recipe, index) => (
                    <Card key={index} style={styles.card}>
                        <Card.Cover source={{ uri: recipe.image }} />
                        <Card.Content>
                            <Title>{recipe.title}</Title>
                        </Card.Content>
                        <Card.Actions>
                            <Button onPress={() => navigation.navigate('RecipeDetails', { recipe })}>View Recipe</Button>
                        </Card.Actions>
                    </Card>
                ))
            ) : (
                <Text>No favorite recipes found</Text>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        paddingBottom: 40,
      },
      card: {
        marginBottom: 10,
      }
});