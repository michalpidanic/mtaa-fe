import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Modal, TextInput} from "react-native";
import { Button } from "react-native-paper";
import Avatar from "./Avatar";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../contexts/AuthContext";
import { Loading } from "./Loading";
import API from "../../Api";
import StorageService from '../services/StorageService'
import NetInfo from '@react-native-community/netinfo';

export default function Message(props: MessageProps) {
    const [loading, setLoading] = useState(false);
    const [editVisible, setEditVisible] = useState(false);
    const [message, onChangeText] = useState(props.text);
    const auth = useAuth();
    const [messageShowText, editMessage] = useState(props.text);

    let offlineList = []

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

    const setOfflineList = async (object) =>{
      try {
          const jsonObject = JSON.stringify(object)
          await StorageService.setItem('@calls', jsonObject)
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
        } catch(e) {
            console.error('Error reading offlineList: ', e)
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

    const messageMenu = () => {
      setEditVisible(true);
    }

    const messageEdit = async () => {
      const internet = await fetchNetworkStatus()
      setEditVisible(!editVisible)
      
      {message && auth.getAccessToken().then((token) => {
        console.log(props.id)
        let send = {
          type: 'patch',
          endpoint: `/message/${props.id}`,
          body: {
            text: message,
            mentions: "",
          },
          head: {
                  headers: 
                  {
                      Authorization: `Bearer ${token}`
                  }
              }
        }
        if (internet == true)
        {
          API.patch(send['endpoint'], send['body'], send['head'])
        } else
        {
          appendOfflineList(send)
          console.log("Saved offline data!")
        }
        })
    }
    //editMessage(message);
    console.log(`Edited message with id: ${props.id} to '${message}'.`)
    }

    const messageDelete = async () => {
      const internet = await fetchNetworkStatus()
      setEditVisible(!editVisible)
      {message && auth.getAccessToken().then((token) => {
        let send = {
          type: 'delete',
          endpoint: `/message/${props.id}`,
          body: {},
          head: {
                  headers: 
                  {
                      Authorization: `Bearer ${token}`
                  }
              }
        }
        if (internet == true)
        {
            
            API.delete(send['endpoint'], send['head'])
            
        } else
        {
            appendOfflineList(send)
            console.log("Saved offline data!")
        }
        })
    }
    console.log(`Deleted message with id: ${props.id}.`)
    }
  
    return (
        <View>
            {loading && <Loading />}
            {!loading && (
            <View style={styles.container}>
              <Modal
              animationType="fade"
              transparent={true}
              visible={editVisible}
              onRequestClose={() => {
                setEditVisible(!editVisible)
              }}>
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <View style={styles.inputWithSend}>
                        <TextInput
                            style={styles.inputField} 
                            placeholder="Edit message"
                            onChangeText={onChangeText}
                            value={message}
                        />
                        <Pressable
                          style={[styles.button, styles.buttonNeutral]}
                          onPress={messageEdit}>
                          <Text style={styles.textStyle}>Edit</Text>
                        </Pressable>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Pressable
                        style={[styles.button, styles.buttonWarning]}
                        onPress={messageDelete}>
                        <Text style={styles.textStyle}>Delete</Text>
                      </Pressable>
                      <Pressable
                        style={[styles.button, styles.buttonNeutral]}
                        onPress={() => setEditVisible(!editVisible)}>
                        <Text style={styles.textStyle}>Close</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </Modal>
              <Pressable onLongPress={messageMenu}> 
                <Text style={props.myMessage ? styles.messageRight:styles.messageLeft}>{messageShowText}</Text>
              </Pressable>
            </View>
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
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: 'column',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 5,
  },
  buttonNeutral: {
    backgroundColor: "#6200ee",
  },
  buttonWarning: {
    backgroundColor: '#ee6200',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

type MessageProps = {
  id: number;
  text: string;
  myMessage: boolean;
  parent: object;
};
