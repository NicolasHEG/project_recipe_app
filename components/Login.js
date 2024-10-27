import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button, TextInput, Title } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const handleLogin = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigation.navigate("BottomNavigation");
      })
      .catch((error) => {
        console.error("Error logging in:", error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Title>What's in my fridge ?</Title>
      </View>

      <View style={styles.form}>
        <TextInput
          mode="outlined"
          label="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          left={<TextInput.Icon icon="email-outline" />}
        />

        {!isPasswordShown && (
          <TextInput
            mode="outlined"
            label="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
            style={styles.input}
            left={<TextInput.Icon icon="lock-outline" />}
            right={
              <TextInput.Icon
                icon="eye-outline"
                onPress={() => setIsPasswordShown(true)}
              />
            }
          />
        )}
        {isPasswordShown && (
          <TextInput
            mode="outlined"
            label="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            left={<TextInput.Icon icon="lock-outline" />}
            right={
              <TextInput.Icon
                icon="eye"
                onPress={() => setIsPasswordShown(false)}
              />
            }
          />
        )}

        <Button
          mode="contained"
          onPress={handleLogin}
          style={styles.loginButton}
          contentStyle={styles.buttonContent}
        >
          Login
        </Button>

        <Button
          mode="text"
          onPress={() => navigation.navigate("Register")}
          style={styles.registerButton}
          labelStyle={styles.registerLabel}
        >
          No account ? Register
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 50,
  },
  form: {
    marginTop: -50,
  },
  input: {
    marginBottom: 20,
    backgroundColor: "white",
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
    color: "#007BFF",
  },
});
