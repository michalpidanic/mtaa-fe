import axios from "axios";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Appbar } from "react-native-paper";
import { Loading } from "../components/Loading";
import UsersItem from "../components/UsersItem";
import { useAuth } from "../contexts/AuthContext";
import { UserService } from "../services/UserService";
import API from "../../Api";

export default function UsersScreen() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      auth.getAccessToken().then((token) => {
        API.get("user", {
          // params: { page: page ?? null, limit: limit ?? null },
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((res) => {
            console.log(res);
            setData(res.data.items);
          })
          .then(() => setLoading(false))
          .catch((error) => {
            setLoading(false);
            console.log(error);
          });
      });
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Users" style={styles.header} />
      </Appbar.Header>
      {loading && <Loading />}
      {!loading && (
        <View>
          {data.map((item) => (
            <UsersItem
              firstName={item.firstName}
              lastName={item.lastName}
              id={item.id}
            />
          ))}
        </View>
      )}
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
});
