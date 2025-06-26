import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Pressable,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function AddPost() {
  const [image, setImage] = useState<string | null>(null);
  const [caption, setCaption] = useState("");

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert("Permission to access camera roll is required");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleAddPost = () => {
    if (!image) {
      alert("Please select an image");
      return;
    }

    console.log("Image:", image);
    console.log("Caption:", caption);
    alert("Post added");
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

      <Pressable style={styles.button} onPress={handleAddPost}>
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
    backgroundColor: "black",
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
