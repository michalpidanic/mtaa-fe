import {
  Platform,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  StatusBar as AndroidStatusBar,
  Image,
  TouchableOpacity,
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
import { useIsFocused } from '@react-navigation/native'
import StorageService from '../services/StorageService'
import { Ionicons } from "@expo/vector-icons";

export default function ChatsScreen() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasInternet, setInternet] = useState(true)
  const auth = useAuth();

  const isFocused = useIsFocused()

  let offlineList = []

  const toggleInternet = async () =>
  {
    const value = await StorageService.getItem('@internet')
    if(value !== null) {
      if (value === 'true')
      {
        setInternet(false)
        await StorageService.setItem('@internet', 'false')
        console.log('You are offline!')
      }
      else
      {
        setInternet(true)
        await StorageService.setItem('@internet', 'true')
        console.log('You are online!')
      }
    }
    else
    {
      setInternet(false)
      await StorageService.setItem('@internet', 'false')
      console.log('You are offline!')
    }
  }

  async function refreshAll()
  {
    if (hasInternet)
    {
      await getOfflineList()
      const listLength = offlineList.length;
      if (listLength != 0)
      {
        console.log(listLength)
        for (let i = 0; i < listLength; i++)
        {
          if (offlineList[i]['type'] == 'post')
          {
            console.log(offlineList[i]['body'])
            await API.post(offlineList[i]['endpoint'], offlineList[i]['body'], offlineList[i]['head'])
          }
          else if (offlineList[i]['type'] == 'delete')
          {
            console.log('delete: ',offlineList[i]['endpoint'])
            await API.delete(offlineList[i]['endpoint'], offlineList[i]['head'])
          }
          else if (offlineList[i]['type'] == 'patch')
          {
            console.log('patch: ',offlineList[i]['endpoint'])
            await API.patch(offlineList[i]['endpoint'], offlineList[i]['body'], offlineList[i]['head'])
          }
        }
        setOfflineList([])
      }
      else
      {
        console.log('Nothing to sync!')
      }
      return
    }
    else
    {
      console.log("You are offline!")
    }
  }

  const setOfflineList = async (object) =>{
      try {
          const jsonObject = JSON.stringify(object)
          console.log('object to write: ',object)
          await StorageService.setItem('@calls', jsonObject)
          console.log('Writing offline list.\n')
      } catch (e) {
          console.error('Error saving offlineList: ', e)
      }
      return
  }

  const getOfflineList = async () =>{
      try {
          const value = await StorageService.getItem('@calls')
          if(value !== null) {
            offlineList = (JSON.parse(value))
          }
          console.log('\nReading offline list.')
      } catch(e) {
          console.error('Error reading offlineList: ', e)
      }
      return
  }

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
  }, [isFocused]);

  return (
    <SafeAreaView>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Chats" style={styles.header} />
        <TouchableOpacity onPress={refreshAll}>
          {offlineList == [] ? <Ionicons style={styles.sendIcon} name={"refresh-circle"} size={30} color={"#ffffff"}/>:<Ionicons style={styles.sendIcon} name={"refresh-circle-outline"} size={30} color={"#ffffff"}/>}
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleInternet}>
          {hasInternet == true ? <Ionicons style={styles.sendIcon} name={"cloud-outline"} size={30} color={"#ffffff"}/>:<Ionicons style={styles.sendIcon} name={"cloud-offline-outline"} size={30} color={"#ffffff"}/>}
        </TouchableOpacity>
      </Appbar.Header>
      {loading && <Loading />}
      {!loading && (
        <View>
          {data.map((item) => (
            <ChatItem
              key = {item.chat.id}
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
  sendIcon:{
    backgroundColor: "#6200ee",
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    textAlignVertical: "center",
  },
});
