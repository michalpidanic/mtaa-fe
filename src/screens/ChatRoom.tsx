import { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import { Appbar } from 'react-native-paper';
import { Loading } from '../components/Loading';
import { useRoute } from '@react-navigation/native'
import { useAuth } from '../contexts/AuthContext';
import API from "../../Api";
import Message from '../components/Message';
import { Ionicons } from "@expo/vector-icons";

export default function ChatsRoom() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const auth = useAuth();
    const [message, onChangeText] = useState('');
    
    const route = useRoute();

    const textSend = async () => {
        {message && auth.getAccessToken().then((token) => {
            API.post('/message/send',
            {
                text: message,
                mentions: "",
                chatId: route.params.id,
            },
            {
                headers: 
                {
                    Authorization: `Bearer ${token}`
                }
            }
            )})
        }
    };

    useEffect(() => {
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