import React, { useEffect, useState } from 'react';
import { Image, View, Text, FlatList } from 'react-native';
import { app } from '../firebaseConfig';
import { getDatabase, onValue, ref } from "firebase/database";
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';

const database = getDatabase(app);

export default function FavoriteMeals() {
    const navigation = useNavigation();

    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const favoritesRef = ref(database, 'favorites');
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
        <View>
            <Text>Favorite Meals</Text>
            <FlatList
                renderItem={({ item }) => (
                    <View>
                        <Text>
                            {item.title}
                        </Text>
                        <Button onPress={() => navigation.navigate('RecipeDetails', { recipe: item })}>View Recipe</Button>
                    </View>
                )}
            data={favorites}/>
        </View>
    );
}