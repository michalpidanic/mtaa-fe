import { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import { Appbar } from 'react-native-paper';
import { Loading } from '../components/Loading';
import { useRoute } from '@react-navigation/native'
import { useAuth } from '../contexts/AuthContext';
import API from "../../Api";
import Message from '../components/Message';
import { Ionicons } from "@expo/vector-icons";
import NetInfo from '@react-native-community/netinfo';
import { State } from 'react-native-gesture-handler';

export default function ChatsRoom() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const auth = useAuth();
    const [message, onChangeText] = useState('');
    const [hasInternet, setConnectionStatus] = useState(false)
    const [offlineList, refreshOfflineList] = useState([])
    
    const route = useRoute();

    function refreshAll()
    {
        const listLength = offlineList.length;
        for (let i = 0; i < listLength; i++)
        {
            API.post(offlineList[i]['endpoint'], offlineList[i]['body'], offlineList[i]['head'])
            console.log(offlineList[i]['body'])
        }
        refreshOfflineList([])
    }

    function appendOfflineList(item)
    {
        const newList = offlineList.concat(item)
        refreshOfflineList(newList)
        console.log(offlineList)
    }

    function fetchNetworkStatus()
    {
        NetInfo.fetch().then(state => {
            setConnectionStatus(state.isInternetReachable)
        });
    }

    const textSend = async () => {
        let send = {}
        {message && auth.getAccessToken().then((token) => {
            send = {
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
            if (hasInternet == false)
            {
                API.post(send['endpoint'], send['body'], send['head'])
            } else
            {
                appendOfflineList(send)
            }
        })
        }
    };

    function checkInternetAndSend()
    {
        fetchNetworkStatus()
        textSend()
    }

    useEffect(() => {
        fetchNetworkStatus()
        const fetchData = async () => {
        auth.getAccessToken().then((token) => {
            API.get(`chat/${route.params.id}/messages`, {
            // params: { page: page ?? null, limit: limit ?? null },
            headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                //console.log(res);
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
        <SafeAreaView>
        <Appbar.Header style={styles.header}>
            <Appbar.Content title={route.params.name} style={styles.header} />
            <TouchableOpacity onPress={refreshAll}>
                {message ? <Ionicons style={styles.sendIcon} name={"refresh-circle"} size={30} color={"#ffffff"}/>:<Ionicons style={styles.sendIcon} name={"refresh-circle-outline"} size={30} color={"#ffffff"}/>}
            </TouchableOpacity>
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
                    <TouchableOpacity onPress={checkInternetAndSend}>
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