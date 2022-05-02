import React, { useState } from "react";
import { View, Text, StyleSheet,TouchableWithoutFeedback } from "react-native";
import { Button } from "react-native-paper";
import Avatar from "./Avatar";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../contexts/AuthContext";
import { Loading } from "./Loading";
import API from "../../Api";
import { NavigationHelpersContext, useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Message(props: MessageProps) {
    const [loading, setLoading] = useState(false);

    const DeleteMessage = async () => {
      console.log(props.myMessage)
    }

    return (
        <View>
            {loading && <Loading />}
            {!loading && (
            <TouchableOpacity onLongPress={DeleteMessage}>
              <View style={styles.container}>
                <Text style={props.myMessage ? styles.messageRight:styles.messageLeft}>{props.text}</Text>
              </View>
            </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    margin: 5,
  },
  messageLeft: {
    textAlign: "left",
    borderRadius: 20,
    padding: 10,
    backgroundColor: "#d2b3ff",
  },
  messageRight: {
    textAlign: "right",
    borderRadius: 20,
    padding: 10,
    backgroundColor: "#8833ff",
  },
});

type MessageProps = {
  id: number;
  text: string;
  myMessage: boolean;
};
