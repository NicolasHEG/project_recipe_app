import React, { useState } from "react";
import { View, StyleSheet, Keyboard, Alert, Text } from "react-native";
import { Button, TouchableRipple } from "react-native-paper";
import { useAuthentication } from "../contexts/AuthenticationContext";
import AuthenticationForm from "./AuthenticationForm";
import { useNavigation } from "@react-navigation/native";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useAuthentication();
  const navigation = useNavigation();

  const handleRegister = async () => {
    try {
      await register(email, password);
      Alert.alert(
        "Registration Successful",
        "You have successfully registered."
      );
    } catch (error) {
      Alert.alert("Registration Failed", error.message);
    }
  };

  return (
    <TouchableRipple onPress={Keyboard.dismiss} style={{ flex: 1 }}>
      <View style={styles.safeArea}>
        <View style={styles.mainContainer}>
          {/* Title */}
          <View style={styles.header}>
            <Text style={styles.title}>Create an Account</Text>
            <Text style={styles.subtitle}>Sign up to get started</Text>
          </View>

          {/* Authentication Form */}
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
          <Button
            mode="text"
            onPress={() => navigation.navigate("Login")}
            style={{ marginTop: 10 }}
            labelStyle={styles.registerLabel}
          >
            Back to login...
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
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginTop: 10,
  },
  input: {
    marginBottom: 15,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  registerButton: {
    marginTop: 10,
  },
  buttonContent: {
    paddingVertical: 5,
  },
});
