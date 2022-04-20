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

var userList = [
  {
    id: "1",
    realName: "Jozko Vajda",
    // profileImage: require("../assets/favicon.png"),
    lastMessage: "Pridem ta pozret <3",
    lastMessageTime: moment().format("LT"),
  },
  {
    id: "2",
    realName: "Stefan Skrucany",
    // profileImage: require("../assets/favicon.png"),
    lastMessage: "Chudak Meky",
    lastMessageTime: moment().format("LT"),
  },
  {
    id: "3",
    realName: "Marika Gombitova",
    // profileImage: require("../assets/favicon.png"),
    lastMessage: "Uz sa kotulam!",
    lastMessageTime: moment().format("LT"),
  },
];

export default function ChatsScreen() {
  return (
    // <View style={styles.container}>
    //   <SafeAreaView style={styles.androidSafeArea} />
    //   <FlatList
    //     style={styles.list}
    //     data={userList}
    //     renderItem={({ item }) => (
    //       <View style={styles.contact}>
    //         <Avatar fullName={item.realName}></Avatar>
    //         <View style={styles.contactData}>
    //           <Text style={styles.name}>{item.realName}</Text>
    //           <Text style={styles.date}>{item.lastMessageTime}</Text>
    //           <Text style={styles.description}>{item.lastMessage}</Text>
    //         </View>
    //       </View>
    //     )}
    //     keyExtractor={(item) => item.id}
    //   />
    // </View>
    <SafeAreaView>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Chats" style={styles.header} />
      </Appbar.Header>
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
