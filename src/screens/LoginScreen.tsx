import React, { useState } from "react";
import { View, SafeAreaView, StyleSheet, TextInput } from "react-native";
import { Appbar, Button, Card, Snackbar } from "react-native-paper";
import { useAuth } from "../contexts/Auth";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const auth = useAuth();
  const handleLogin = async () => {
    if (await auth.login(username, password)) {
      setSnackbarVisible(true);
    }
  };

  const onDismissSnackBar = () => setSnackbarVisible(false);

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Login" style={styles.header} />
      </Appbar.Header>
      <View>
        <Card style={styles.card}>
          <Card.Content>
            <TextInput
              placeholder="Username"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(text: string) => setUsername(text)}
            ></TextInput>
            <TextInput
              placeholder="Password"
              style={styles.textInput}
              secureTextEntry={true}
              autoCapitalize="none"
              onChangeText={(text: string) => setPassword(text)}
            ></TextInput>
            <Button
              mode="contained"
              style={styles.button}
              onPress={handleLogin}
            >
              Login
            </Button>
            <Button
              mode="outlined"
              style={styles.button}
              onPress={() => navigation.navigate("Register")}
            >
              Register
            </Button>
          </Card.Content>
        </Card>
      </View>
      <Snackbar visible={snackbarVisible} onDismiss={onDismissSnackBar}>
        Invalid credentials!
      </Snackbar>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  card: {
    margin: 10,
  },
  textInput: {
    height: 56,
    paddingTop: 8,
    borderColor: "#00000054",
    borderRadius: 2,
    borderWidth: 1,
    fontSize: 16,
    paddingRight: 14,
    paddingLeft: 14,
    marginTop: 8,
    marginBottom: 8,
  },
  header: {
    justifyContent: "flex-start",
    flexDirection: "row",
    textAlign: "left",
  },
  button: {
    marginTop: 8,
    marginBottom: 8,
  },
});
