import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Image } from "react-native";

export default function Avatar(props) {
  return (
    <Image
      style={styles.image}
      source={{
        uri: `https://avatars.dicebear.com/api/initials/${props.fullName}.png`,
      }}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
