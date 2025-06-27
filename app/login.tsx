import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Pressable,
} from "react-native";
import { router } from "expo-router";
import Logo from "../assets/images/logo.png";
import { useAuth } from "@/components/AuthProvider";
import { useState } from "react";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignIn() {
    try {
      await login(email, password);
      router.replace("/(tabs)");
    } catch (err) {
      alert("Email or password is incorrect");
    }
  }

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} resizeMode="contain"></Image>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Email"
        placeholderTextColor="white"
        autoCapitalize="none"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      ></TextInput>
      <TextInput
        placeholder="Password"
        placeholderTextColor="white"
        autoCapitalize="none"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      ></TextInput>
      <Pressable style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </Pressable>
      <Text style={styles.link} onPress={() => router.push("/register")}>
        Create a new account
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 12,
    backgroundColor: "#00003C",
  },
  logo: {
    width: 220,
    height: 220,
    alignSelf: "center",
    marginBottom: -20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
    color: "white",
  },
  input: {
    borderWidth: 1,
    borderColor: "#1DD2AF",
    padding: 12,
    borderRadius: 4,
    marginBottom: 8,
    color: "white",
  },
  link: {
    marginTop: 6,
    color: "white",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#1DD2AF",
    padding: 12,
    borderRadius: 4,
    alignItems: "center",
    marginBottom: 16,
    marginTop: 16,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
