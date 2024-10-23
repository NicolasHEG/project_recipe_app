import React, {useState} from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export default function Login() {

    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordShown, setIsPasswordShown] = useState(false);

    const handleLogin = () => {
        console.log('Email:', email);
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('User logged in:', user);
            navigation.navigate('BottomNavigation');
        })
        .catch((error) => {
            console.error('Error logging in:', error);
        });
    }

    return(
        <View>
            <View></View>
            <View style={{marginTop:300}}>
                <TextInput 
                    mode="outlined"
                    label="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                {!isPasswordShown && <TextInput 
                    mode="outlined"
                    label="Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry
                    right={<TextInput.Icon icon="eye-outline" onPress={() => setIsPasswordShown(true)} />}
                />}
                {isPasswordShown && <TextInput 
                    mode="outlined"
                    label="Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    right={<TextInput.Icon icon="eye" onPress={() => setIsPasswordShown(false)}/>}
                />}
                <Button 
                    onPress={handleLogin}
                    mode="contained"
                >
                    Login
                </Button>
                <Button
                    onPress={() => navigation.navigate("Register")}
                    mode="text"
                >
                    No account ?
                </Button>
            </View>
        </View>
        
        
    );
}