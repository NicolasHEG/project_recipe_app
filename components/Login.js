import React, { useState } from "react";
import { Keyboard, View, StyleSheet, Alert, Text } from "react-native";
import { Button, TouchableRipple } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useAuthentication } from "../contexts/AuthenticationContext";
import AuthenticationForm from "./AuthenticationForm";

export default function Login() {
  const navigation = useNavigation();
  const { login } = useAuthentication();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await login(email, password);
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert("Login Failed", error.message);
    }
  };

  return (
    <TouchableRipple onPress={Keyboard.dismiss} style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome Back!</Text>
          <Text style={styles.subtitle}>Please login to continue</Text>
        </View>
        
        <AuthenticationForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
        />
        
        <Button
          mode="contained"
          onPress={handleLogin}
          style={styles.loginButton}
        >
          Login
        </Button>
        
        <Button
          mode="text"
          onPress={() => navigation.navigate("Register")}
          style={styles.registerButton}
          labelStyle={styles.registerLabel}
        >
          No account? Register
        </Button>
      </View>
    </TouchableRipple>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
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
  form: {
    marginTop: -50,
  },
  input: {
    marginBottom: 20,
  },
  loginButton: {
    marginTop: 20,
    borderRadius: 10,
  },
  buttonContent: {
    paddingVertical: 5,
  },
  registerButton: {
    marginTop: 10,
  },
  registerLabel: {
    fontSize: 14,
  },
});
