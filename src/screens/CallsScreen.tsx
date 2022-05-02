import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Alert,
  Button,
  SectionList,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from "react-native";
import { Appbar } from "react-native-paper";

export default function CallScreen() {
  return (
    <SafeAreaView>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Calls" style={styles.header} />
      </Appbar.Header>
      <View style={styles.container}>
        <Text>Calls screen!</Text>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
  },
  title: {
    fontSize: 24,
  },
  header: {
    justifyContent: "flex-start",
    flexDirection: "row",
    textAlign: "left",
  },
});
