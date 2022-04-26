import { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, StyleSheet, } from 'react-native';
import { Appbar } from 'react-native-paper';
import { Loading } from '../components/Loading';
import { useRoute } from '@react-navigation/native'
import { useAuth } from '../contexts/AuthContext';
import API from "../../Api";
import Message from '../components/Message';

export default function ChatsRoom() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const auth = useAuth();
    
    const route = useRoute();

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
                {data.map((item) => (
                    <Message
                    text={item.text}
                    id={item.chat.id}
                    myMessage={route.params.currentUser == item.sender.id ? true:false}
                />
                ))}
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
    }
  });