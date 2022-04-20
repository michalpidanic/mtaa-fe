import React, { useState } from "react";
import { View, SafeAreaView, StyleSheet, Text, TextInput } from "react-native";
import { Appbar, Button, Card, Snackbar } from "react-native-paper";
import { AuthService } from "../services/AuthService";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleRegister = () => {
    if (
      email === "" ||
      username === "" ||
      password === "" ||
      confirmPassword === "" ||
      firstName === "" ||
      lastName === ""
    ) {
      setSnackbarMessage("Please fill in all fields!");
      setSnackbarVisible(true);
    } else if (password !== confirmPassword) {
      setSnackbarMessage("Passwords do not match!");
      setSnackbarVisible(true);
    } else {
      const data = {
        email: email,
        userName: username,
        firstName: firstName,
        lastName: lastName,
        password: password,
      };
      AuthService.register(data).then(() => navigation.navigate("Login"));
    }
  };

  const onDismissSnackBar = () => setSnackbarVisible(false);

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Register" style={styles.header} />
      </Appbar.Header>
      <View>
        <Card style={styles.card}>
          <Card.Content>
            <TextInput
              placeholder="Email"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(text: string) => setEmail(text)}
            ></TextInput>
            <TextInput
              placeholder="Username"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(text: string) => setUsername(text)}
            ></TextInput>
            <TextInput
              placeholder="First name"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(text: string) => setFirstName(text)}
            ></TextInput>
            <TextInput
              placeholder="Last name"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(text: string) => setLastName(text)}
            ></TextInput>
            <TextInput
              placeholder="Password"
              style={styles.textInput}
              secureTextEntry={true}
              autoCapitalize="none"
              onChangeText={(text: string) => setPassword(text)}
            ></TextInput>
            <TextInput
              placeholder="Confirm password"
              style={styles.textInput}
              secureTextEntry={true}
              autoCapitalize="none"
              onChangeText={(text: string) => setConfirmPassword(text)}
            ></TextInput>
            <Button
              mode="contained"
              style={styles.button}
              onPress={handleRegister}
            >
              Register
            </Button>
            <Button
              mode="outlined"
              style={styles.button}
              onPress={() => navigation.navigate("Login")}
            >
              Login
            </Button>
          </Card.Content>
        </Card>
      </View>
      <Snackbar visible={snackbarVisible} onDismiss={onDismissSnackBar}>
        {snackbarMessage}
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
