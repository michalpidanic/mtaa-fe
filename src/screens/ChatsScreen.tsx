import {
  Platform,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  StatusBar as AndroidStatusBar,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import moment from "moment";
import Avatar from "../components/Avatar";
import { Appbar } from "react-native-paper";
import ChatItem from "../components/ChatItem";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import API from "../../Api";
import { Loading } from "../components/Loading";

export default function ChatsScreen() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      auth.getAccessToken().then((token) => {
        API.get("chat", {
          // params: { page: page ?? null, limit: limit ?? null },
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((res) => {
            //console.log(res);
            setData(res.data.chats);
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
    <SafeAreaView>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Chats" style={styles.header} />
      </Appbar.Header>
      {loading && <Loading />}
      {!loading && (
        <View>
          {data.map((item) => (
            <ChatItem
              chatName={item.chat.name}
              messageText={item.lastMessage.text}
              messageCreated={
                item.lastMessage.createdAt
                  ? moment(item.lastMessage.createdAt).format("HH:mm")
                  : null
              }
              currentUser={item.user.id}
              id={item.chat.id}
            />
          ))}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "flex-start",
  },
  header: {
    justifyContent: "flex-start",
    flexDirection: "row",
    textAlign: "left",
  },
  contact: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#FFF",
    alignItems: "flex-start",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    width: "100%",
  },
  contactData: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#FF0",
    width: "100%",
  },
  androidSafeArea: {
    backgroundColor: "#FFF",
    paddingTop: Platform.OS === "android" ? AndroidStatusBar.currentHeight : 0,
  },
  name: {
    backgroundColor: "#FFF",
    paddingHorizontal: 10,
    alignSelf: "flex-start",
  },
  date: {
    flex: 1,
    backgroundColor: "#FFF",
    alignSelf: "flex-end",
  },
  description: {
    backgroundColor: "#FFF",
    paddingHorizontal: 10,
    alignSelf: "flex-start",
  },
  list: {
    flex: 1,
    backgroundColor: "#FFF",
    width: "100%",
  },
});
