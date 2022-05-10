import { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, StyleSheet, TextInput, TouchableOpacity, Alert} from 'react-native';
import { Appbar } from 'react-native-paper';
import { Loading } from '../components/Loading';
import { useRoute } from '@react-navigation/native'
import { useAuth } from '../contexts/AuthContext';
import API from "../../Api";
import Message from '../components/Message';
import { Ionicons } from "@expo/vector-icons";
import NetInfo from '@react-native-community/netinfo';
import StorageService from '../services/StorageService'

export default function ChatsRoom() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const auth = useAuth();
    const [message, onChangeText] = useState('');
    
    let offlineList = []

    let offlineData = []
    
    const route = useRoute();

    const setOfflineList = async (object) =>{
        try {
            const jsonObject = JSON.stringify(object)
            await StorageService.setItem('@calls', jsonObject)
        } catch (e) {
            console.error('Error saving offlineList: ', e)
        }
        return
    }

    const setDataList = async (id,object) =>{
        try {
            const jsonObject = JSON.stringify(object)
            await StorageService.setItem(`@data${id}`, jsonObject)
        } catch (e) {
            console.error('Error saving offlineData: ', e)
        }
        return
    }

    const getOfflineList = async () =>{
        try {
            const value = await StorageService.getItem('@calls')
            if(value !== null) {
              offlineList = (JSON.parse(value))
            }
        } catch(e) {
            console.error('Error reading offlineList: ', e)
        }
        return
    }

    const getDataList = async (id) =>{
        try {
            const value = await StorageService.getItem(`@data${id}`)
            if(value !== null) {
                offlineData = (JSON.parse(value))
            }
        } catch(e) {
            console.error('Error reading offlineData: ', e)
        }
        return
    }

    async function appendOfflineList(item)
    {
        await getOfflineList()
        const newList = await offlineList.concat(item);
        offlineList = newList;
        await console.log(offlineList)
        await setOfflineList(offlineList)
        offlineList = []
    }

    async function fetchNetworkStatus()
    {
    //    let hasInternet = await NetInfo.fetch()['_W']['isInternetReachable']
    //    return hasInternet
       const value = await StorageService.getItem('@internet')
       if (value == 'false')
       {
            return false
       }
       else
       {
           return true
       }
    }

    const textSend = async () => {
        let send = {}
        console.log(message)
        {message && auth.getAccessToken().then((token) => {
            send = {
                type: 'post',
                endpoint: '/message/send',
                body: {
                        text: message,
                        mentions: "",
                        chatId: route.params.id,
                    },
                head: {
                        headers: 
                        {
                            Authorization: `Bearer ${token}`
                        }
                    }
            }
            
        })
        }
        if (await fetchNetworkStatus() == true && message)
        {
            API.post(send['endpoint'], send['body'], send['head'])
        } else if (message)
        {
            appendOfflineList(send)
            console.log("Saved offline data!")
        }
        else
        {
            console.log('No message')
        }
        onChangeText('')
    };

    useEffect( () => {
        const fetchData = async () => {
            const internet = await fetchNetworkStatus()
            if(internet)
            {
                auth.getAccessToken().then((token) => {
                    API.get(`chat/${route.params.id}/messages`, {
                    // params: { page: page ?? null, limit: limit ?? null },
                    headers: { Authorization: `Bearer ${token}` },
                    })
                    .then((res) => {
                        //console.log(res);
                        setData(res.data.items);
                        setDataList(route.params.id,res.data.items);
                    })
                    .then(() => setLoading(false))
                    .catch((error) => {
                        setLoading(false);
                        console.log(error);
                    });
                });
            }
            else
            {
                await getDataList(route.params.id);
                await setData(offlineData);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <SafeAreaView>
        <Appbar.Header style={styles.header}>
            <Appbar.Content title={route.params.name} style={styles.header} />
        </Appbar.Header>
        {loading && <Loading />}
        {!loading && (
            <View>
                <View>
                    {data.map((item) => (
                        <Message
                        key={item.id}
                        text={item.text}
                        id={item.id}
                        myMessage={route.params.currentUser == item.sender.id ? true:false}
                        parent={this}
                    />
                    ))}
                </View>
                <View style={styles.inputWithSend}>
                    <TextInput
                        style={styles.inputField} 
                        placeholder="Message"
                        onChangeText={onChangeText}
                        value={message}
                    />
                    <TouchableOpacity onPress={textSend}>
                        {message ? <Ionicons style={styles.sendIcon} name={"paper-plane"} size={30} color={"#ffffff"}/>:<Ionicons style={styles.sendIcon} name={"paper-plane-outline"} size={30} color={"#ffffff"}/>}
                    </TouchableOpacity>
                </View>
            </View>
            
        )}
      </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
    header: {
      justifyContent: "flex-start",
      flexDirection: "row",
      textAlign: "left",
    },
    inputWithSend: {
        justifyContent: "flex-end",
        flexDirection: "row",
        margin: 10,
    },
    inputField:{
        //borderWidth: 1,
        backgroundColor: "#ffffff80",
        borderRadius: 50,
        paddingHorizontal: 10,
        marginRight: 10,
        flex:1,
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
    }
  });