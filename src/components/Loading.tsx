import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

export const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={"#6200ee"} animating={true} size="small" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
