import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Pressable,
} from "react-native";
import storage from "@/lib/storage";
import firestore from "@/lib/firestore";
import { useAuth } from "@/components/AuthProvider";
import { useImagePicker } from "@/hooks/useImagePicker";

export default function AddPost() {
  const auth = useAuth();
  const [caption, setCaption] = useState("");
  const { image, openImagePicker, reset } = useImagePicker();

  async function save() {
    console.log("save was called");
    if (!image) {
      console.log("no image");
      return;
    }
    try {
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
      setCaption("");
      reset();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.imagePicker} onPress={openImagePicker}>
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
      <Pressable style={styles.resetButton} onPress={reset}>
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
