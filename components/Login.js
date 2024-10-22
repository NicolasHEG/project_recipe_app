import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function Login() {

    const navigation = useNavigation();

    return(
        <View>
            <View></View>
            <View style={{marginTop:300}}>
                <Button onPress={() => navigation.navigate("BottomNavigation")}>Login</Button>
            </View>
        </View>
        
        
    );
}