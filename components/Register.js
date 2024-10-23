import React, {useState} from 'react';
import { View, StyleSheet, Keyboard } from 'react-native';
import { Button, TextInput, TouchableRipple } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';


export default function Register() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleRegister = () => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {

        })
        .catch((error) => {
            // Error will display a message under the input field
            console.error('Error registering user:', error);
        });
    }

    return(
        <TouchableRipple onPress={Keyboard.dismiss}>
            <SafeAreaView>
                <View style={styles.mainContainer}>
                    <View style={styles.fieldContainer}>
                        <TextInput
                            label="Firstname"
                            mode="outlined"
                            value={firstName}
                            onChangeText={text => setFirstName(text)}
                        />
                        <TextInput 
                            label="Lastname"
                            mode="outlined"
                            value={lastName}
                            onChangeText={text => setLastName(text)}
                        />
                        <TextInput 
                            label="Email"
                            placeholder="example@email.com"
                            mode="outlined"
                            value={email}
                            onChangeText={text => setEmail(text)}
                            error={email.length > 0 && !email.includes('@')}
                        />
                        <TextInput 
                            label="Password"
                            mode="outlined"
                            value={password}
                            onChangeText={text => setPassword(text)}
                            secureTextEntry
                            error={password.length > 0 && password.length < 6}
                        />
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