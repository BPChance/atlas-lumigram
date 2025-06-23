import {
  View,
  Button,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Pressable,
} from "react-native";
import { router } from "expo-router";
import Logo from "../assets/images/logo.png";

export default function Login() {
  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} resizeMode="contain"></Image>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Email"
        placeholderTextColor="white"
        autoCapitalize="none"
        style={styles.input}
      ></TextInput>
      <TextInput
        placeholder="Password"
        placeholderTextColor="white"
        autoCapitalize="none"
        style={styles.input}
      ></TextInput>
      <Pressable
        style={styles.button}
        onPress={() => router.replace("/(tabs)")}
      >
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
  },
  title: {
    fontSize: 24,
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
