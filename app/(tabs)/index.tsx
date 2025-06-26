import React, { useState } from "react";
import { View, Text, Image, Alert, StyleSheet, Dimensions } from "react-native";
import { FlashList } from "@shopify/flash-list";
import {
  TapGestureHandler,
  LongPressGestureHandler,
  State,
} from "react-native-gesture-handler";
import { homeFeed } from "@/placeholder";
const { width } = Dimensions.get("window");

export default function Home() {
  return (
    <FlashList
      data={homeFeed}
      keyExtractor={(item) => item.id}
      estimatedItemSize={50}
      renderItem={({ item }) => (
        <PostItem image={item.image} caption={item.caption} id={item.id} />
      )}
    />
  );
}

function PostItem({
  image,
  caption,
  id,
}: {
  image: string;
  caption: string;
  id: string;
}) {
  const [showCaption, setShowCaption] = useState(false);
  const handleLongPress = (state: any) => {
    if (state.nativeEvent.state === State.ACTIVE) {
      setShowCaption(true);
    } else if (state.nativeEvent.state === State.END) {
      setShowCaption(false);
    }
  };

  const handleDoubleTap = () => {
    Alert.alert("Double tapped");
  };

  return (
    <LongPressGestureHandler
      onHandlerStateChange={handleLongPress}
      minDurationMs={500}
    >
      <TapGestureHandler numberOfTaps={2} onActivated={handleDoubleTap}>
        <View style={styles.post}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.image} />
            {showCaption && (
              <View style={styles.captionContainer}>
                <Text style={styles.caption}>{caption}</Text>
              </View>
            )}
          </View>
        </View>
      </TapGestureHandler>
    </LongPressGestureHandler>
  );
}

const styles = StyleSheet.create({
  post: {
    marginBottom: 8,
    alignItems: "center",
  },
  imageContainer: {
    position: "relative",
    width: width,
    height: width,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 16,
  },
  captionContainer: {
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 8,
    borderRadius: 6,
  },
  caption: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});
