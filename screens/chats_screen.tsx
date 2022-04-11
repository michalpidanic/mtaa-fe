import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Alert, Button, SectionList, StyleSheet, Text, View, SafeAreaView} from 'react-native';

export default function ChatsScreen() {
  return (
    <View style={styles.container}>
      <Text>Chats screen!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
},
title: {
  fontSize: 24,
}
});