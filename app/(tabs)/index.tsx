import { router, Stack } from "expo-router";
import { Button, Text, Image, StyleSheet, View } from "react-native";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text>Home Feed</Text>
      <>
        <Stack.Screen />
      </>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
