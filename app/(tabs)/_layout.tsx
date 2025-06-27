import { auth } from "@/firebaseConfig";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { router, Tabs } from "expo-router";
import { Pressable } from "react-native";
import { useAuth } from "@/components/AuthProvider";

export default function TabLayout() {
  const { logout } = useAuth();
  async function handleLogout() {
    await logout();
    router.replace("/login");
  }

  return (
    <Tabs
      screenOptions={{
        headerTitleAlign: "left",
        tabBarActiveTintColor: "#1DD2AF",
        tabBarInactiveTintColor: "#999",
        headerRight: () => (
          <Pressable onPress={handleLogout} style={{ marginRight: 16 }}>
            <MaterialIcons name="logout" size={24} color="#1DD2AF" />
          </Pressable>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home Feed",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={28}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => (
            <Ionicons size={24} name="search" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: "Add Post",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={24} name="add" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ focused, color }) => (
            <MaterialIcons
              size={24}
              name={focused ? "favorite" : "favorite-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused, color }) => (
            <MaterialIcons
              size={24}
              name={focused ? "person" : "person-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
