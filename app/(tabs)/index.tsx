import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { View, Text, Image, Alert, StyleSheet, Dimensions } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { homeFeed } from "@/placeholder";
import { useState } from "react";
const { width } = Dimensions.get("window");

export default function HomeFeed() {
  const renderItem = ({ item }: { item: (typeof homeFeed)[0] }) => (
    <PostItem image={item.image} caption={item.caption} id={item.id} />
  );

  return (
    <FlashList
      data={homeFeed}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      estimatedItemSize={50}
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

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      Alert.alert("Double tap");
    })
    .runOnJS(true);

  const longPress = Gesture.LongPress()
    .onStart(() => setShowCaption(true))
    .onEnd(() => setShowCaption(false))
    .runOnJS(true);

  const gesture = Gesture.Simultaneous(doubleTap, longPress);

  return (
    <GestureDetector gesture={gesture}>
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
    </GestureDetector>
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
    height: 400,
    resizeMode: "cover",
    borderRadius: 16,
  },
  caption: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
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
});
