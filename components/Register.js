import React, { useState } from "react";
import { View, StyleSheet, Keyboard } from "react-native";
import { Button, TextInput, TouchableRipple } from "react-native-paper";
import { useAuthentication } from "../contexts/AuthenticationContext";
import AuthenticationForm from "./AuthenticationForm";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useAuthentication();

  const handleRegister = async () => {
    try {
      await register(email, password);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableRipple onPress={Keyboard.dismiss} style={{ flex: 1 }}>
      <View style={styles.safeArea}>
        <View style={styles.mainContainer}>
          <AuthenticationForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
          />
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
