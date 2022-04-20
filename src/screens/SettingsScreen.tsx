import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Appbar, Button } from "react-native-paper";
import { useAuth } from "../contexts/AuthContext";

export default function SettingsScreen() {
  const auth = useAuth();
  const handleLogout = async () => {
    await auth.logout();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Settings" style={styles.header} />
      </Appbar.Header>
      <View style={styles.logoutBtnRow}>
        <Button mode="outlined" style={styles.logoutBtn} onPress={handleLogout}>
          Logout
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  header: {
    justifyContent: "flex-start",
    flexDirection: "row",
    textAlign: "left",
  },
  logoutBtn: {
    margin: 10,
  },
  logoutBtnRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
