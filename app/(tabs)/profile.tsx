import { useAuth } from "@/components/AuthProvider";
import { router, Stack } from "expo-router";
import { View, Text, StyleSheet, Button } from "react-native";

export default function Tab() {
  const { user } = useAuth();
  return (
    <View style={styles.container}>
      <Text>{user?.email}</Text>
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
