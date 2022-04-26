import React, { useState } from "react";
import { View, Text, StyleSheet,TouchableWithoutFeedback } from "react-native";
import { Button } from "react-native-paper";
import Avatar from "./Avatar";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../contexts/AuthContext";
import { Loading } from "./Loading";
import API from "../../Api";
import { NavigationHelpersContext, useNavigation } from "@react-navigation/native";

export default function ChatItem(props: ChatItemProps) {
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  const navigator = useNavigation();


  //   const createChat = () => {
  //     auth.getAccessToken().then((token) => {
  //       API.post(
  //         "chat/new",
  //         {
  //           name: `${props.firstName} ${props.lastName}`,
  //           membersId: [+userId, +props.id],
  //         },
  //         {
  //           headers: { Authorization: `Bearer ${token}` },
  //         }
  //       )
  //         .then((res) => {
  //           console.log(res);
  //         })
  //         .then(() => setLoading(false))
  //         .catch((error) => {
  //           setLoading(false);
  //           console.log(error);
  //         });
  //     });
  //   };

  //   const auth = useAuth();
  //   auth.getUserId().then((userId) => {
  //     setUserId(userId);
  //     setLoading(false);
  //   });

  const onClick = () =>
  {
    navigator.navigate("Room", {id: props.id, name: props.chatName, currentUser: props.currentUser});
  }

  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View>
        {loading && <Loading />}
        {!loading && (
          <View style={styles.container}>
            <View style={styles.containerItem}>
              <Avatar fullName={props.chatName} />
              <View>
                <Text style={styles.nameLabel}>{props.chatName}</Text>
                <Text style={styles.messageText}>{props.messageText}</Text>
              </View>
            </View>
            <View style={styles.containerItem}>
              <Text style={styles.messageCreated}>{props.messageCreated}</Text>
            </View>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
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
  messageText: {
    marginLeft: 20,
  },
  messageCreated: {
    marginRight: 20,
  },
});

type ChatItemProps = {
  chatName: string;
  id: number;
  messageText: string;
  messageCreated: string;
  currentUser: number;
};
