import React, {useState} from 'react';
import { View, StyleSheet, Keyboard } from 'react-native';
import { Button, TextInput, TouchableRipple } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';


export default function Register() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Errors
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');


    const handleRegister = () => {

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('User registered:', userCredential.user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            switch (errorCode) {
                case 'auth/email-already-in-use':
                    setEmailError('Email already in use');
                    break;
                case 'auth/invalid-email':
                    setEmailError('Invalid email');
                    break;
                case 'auth/weak-password':
                    console.error('Error registering user:', errorMessage);
                    setPasswordError('Weak password');
                    break;
                default:
                    console.error('Error registering user:', errorMessage);
            }
        });
    }

    return(
        <TouchableRipple onPress={Keyboard.dismiss}>
            <SafeAreaView>
                <View style={styles.mainContainer}>
                    <View style={styles.fieldContainer}>
                        <TextInput 
                            label="Email"
                            placeholder="example@email.com"
                            mode="outlined"
                            value={email}
                            onChangeText={text => setEmail(text)}
                        />
                        <TextInput 
                            label="Password"
                            mode="outlined"
                            value={password}
                            onChangeText={text => setPassword(text)}
                            secureTextEntry
                        />
                        {passwordError ? <Text>{passwordError}</Text> : null}
                        {emailError ? <Text>{emailError}</Text> : null}
                    </View>
                    <View>
                        <Button
                            mode='contained'
                            onPress={handleRegister}
                        >
                            Register
                        </Button>
                    </View>
                </View>
            </SafeAreaView>
        </TouchableRipple>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        margin: 10
    },
    fieldContainer: {
        marginBottom: 10
    }
});