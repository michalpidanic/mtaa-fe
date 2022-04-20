import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Appbar } from "react-native-paper";

export default function NotificationsScreen() {
  return (
    <SafeAreaView>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Notifications" style={styles.header} />
      </Appbar.Header>
      <View style={styles.container}>
        <Text>Notifications screen!</Text>
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
  header: {
    justifyContent: "flex-start",
    flexDirection: "row",
    textAlign: "left",
  },
});
