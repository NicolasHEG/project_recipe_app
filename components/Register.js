import React, { useState } from "react";
import { View, StyleSheet, Keyboard } from "react-native";
import { Button, TextInput, TouchableRipple } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Errors
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleRegister = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User registered:", userCredential.user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        switch (errorCode) {
          case "auth/email-already-in-use":
            setEmailError("Email already in use");
            break;
          case "auth/invalid-email":
            setEmailError("Invalid email");
            break;
          case "auth/weak-password":
            console.error("Error registering user:", errorMessage);
            setPasswordError("Weak password");
            break;
          default:
            console.error("Error registering user:", errorMessage);
        }
      });
  };

  return (
    <TouchableRipple onPress={Keyboard.dismiss} style={{ flex: 1 }}>
      <View style={styles.safeArea}>
        <View style={styles.mainContainer}>
          <TextInput
            label="Email"
            placeholder="example@email.com"
            mode="outlined"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            left={<TextInput.Icon icon="email-outline" />}
          />
          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null}

          <TextInput
            label="Password"
            mode="outlined"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
            style={styles.input}
            left={<TextInput.Icon icon="lock-outline" />}
          />
          {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}

          <Button
            mode="contained"
            onPress={handleRegister}
            style={styles.registerButton}
            contentStyle={styles.buttonContent}
          >
            Register
          </Button>
        </View>
      </View>
    </TouchableRipple>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  input: {
    marginBottom: 15,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  registerButton: {
    marginTop: 20,
  },
  buttonContent: {
    paddingVertical: 5,
  },
});
