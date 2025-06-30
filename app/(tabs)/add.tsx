import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Pressable,
} from "react-native";
import {
  launchImageLibraryAsync,
  requestCameraPermissionsAsync,
  MediaType,
  MediaTypeOptions,
} from "expo-image-picker";
import storage from "@/lib/storage";
import firestore from "@/lib/firestore";
import { useAuth } from "@/components/AuthProvider";

export default function AddPost() {
  const auth = useAuth();
  async function save() {
    if (!image) return;
    const name = image?.split("/").pop() as string;
    const { downloadUrl, metadata } = await storage.upload(image, name);
    console.log(downloadUrl);
    firestore.addPost({
      caption,
      image: downloadUrl,
      createdAt: new Date(),
      createdBy: auth.user?.uid!!,
    });
    alert("Image added");
  }

  const [image, setImage] = useState<string | null>(null);
  const [caption, setCaption] = useState("");

  const pickImage = async () => {
    const permissionResult = await requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      alert("Permission to access camera roll is required");
      return;
    }

    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.imagePicker} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Text style={styles.imageText}>Select Image</Text>
        )}
      </Pressable>

      <TextInput
        style={styles.input}
        placeholder="Add a caption"
        placeholderTextColor="grey"
        value={caption}
        onChangeText={setCaption}
      />

      <Pressable style={styles.button} onPress={save}>
        <Text style={styles.buttonText}>Save</Text>
      </Pressable>
      <Pressable style={styles.resetButton}>
        <Text style={styles.resetButtonText}>Reset</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 16,
  },
  imagePicker: {
    width: "90%",
    height: 300,
    backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
    marginBottom: 32,
    alignSelf: "center",
  },
  imageText: {
    color: "white",
    fontSize: 16,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: "#1DD2AF",
    backgroundColor: "white",
    padding: 12,
    borderRadius: 6,
    marginBottom: 24,
    minHeight: 60,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#1DD2AF",
    padding: 18,
    paddingVertical: 24,
    paddingHorizontal: 32,
    marginBottom: 24,
    width: "90%",
    borderRadius: 6,
    alignItems: "center",
    alignSelf: "center",
  },
  resetButton: {
    padding: 18,
    paddingVertical: 24,
    paddingHorizontal: 32,
    width: "90%",
    borderRadius: 6,
    alignItems: "center",
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  resetButtonText: {
    color: "black",
    fontSize: 16,
  },
});
