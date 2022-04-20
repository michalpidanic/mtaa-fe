import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import Avatar from "./Avatar";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../contexts/AuthContext";
import { Loading } from "./Loading";
import API from "../../Api";

export default function UsersItem(props: UsersItemProps) {
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  const createCall = () => {
    console.log("call", props.id);
  };

  const createChat = () => {
    auth.getAccessToken().then((token) => {
      API.post(
        "chat/new",
        {
          name: `${props.firstName} ${props.lastName}`,
          membersId: [+userId, +props.id],
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
        .then((res) => {
          console.log(res);
        })
        .then(() => setLoading(false))
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    });
  };

  const auth = useAuth();
  auth.getUserId().then((userId) => {
    setUserId(userId);
    setLoading(false);
  });

  return (
    <View>
      {loading && <Loading />}
      {!loading && (
        <View style={styles.container}>
          <View style={styles.containerItem}>
            <Avatar fullName={`${props.firstName} ${props.lastName}`} />
            <Text style={styles.nameLabel}>
              {props.firstName} {props.lastName}
            </Text>
          </View>
          {userId !== props.id && (
            <View style={styles.containerItem}>
              <Button onPress={createCall}>
                <Ionicons name={"call"} size={24} />
              </Button>
              <Button onPress={createChat}>
                <Ionicons name={"chatbox"} size={24} />
              </Button>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  containerItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  nameLabel: {
    marginLeft: 20,
    fontWeight: "bold",
  },
});

type UsersItemProps = {
  firstName: string;
  lastName: string;
  id: number;
};
