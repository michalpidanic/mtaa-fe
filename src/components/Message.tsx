import React, { useState } from "react";
import { View, Text, StyleSheet,TouchableWithoutFeedback } from "react-native";
import { Button } from "react-native-paper";
import Avatar from "./Avatar";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../contexts/AuthContext";
import { Loading } from "./Loading";
import API from "../../Api";
import { NavigationHelpersContext, useNavigation } from "@react-navigation/native";

export default function Message(props: MessageProps) {
    const [loading, setLoading] = useState(false);

    //console.log(props.myMessage)

    return (
        <View>
            {loading && <Loading />}
            {!loading && (
            <View style={styles.container}>
                <Text style={props.myMessage ? styles.messageRight:styles.messageRLeft}>{props.text}</Text>
            </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    //flexDirection: "row",
    //justifyContent: "space-between",
    //alignItems: "center",
    padding: 10,
  },
  messageLeft: {
    textAlign: "left",
  },
  messageRight: {
    textAlign: "right",
  },
});

type MessageProps = {
  id: number;
  text: string;
  myMessage: boolean;
};
