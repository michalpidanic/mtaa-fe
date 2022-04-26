import React from "react";
import CallsScreen from "../screens/CallsScreen";
import ChatsScreen from "../screens/ChatsScreen";
import UsersScreen from "../screens/UsersScreen";
import ChatRoom from "../screens/ChatRoom";
import NotificationsScreen from "../screens/NotificationsScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Tab = createMaterialBottomTabNavigator();

const Stack = createNativeStackNavigator();

function ChatNav() {
  return (
    <Stack.Navigator >
      <Stack.Screen
        name="Chat"
        component={ChatsScreen} 
        options={{
          headerShown: false
        }}
        />
      <Stack.Screen
        name="Room"
        component={ChatRoom} 
        options={{
          headerShown: false
        }}
        />
    </Stack.Navigator>
  );
}

export const AppRoutes = () => {
  return (
    <Tab.Navigator barStyle={{ backgroundColor: "#6200ee" }}>
      <Tab.Screen
        name="Chats"
        component={ChatNav}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={"chatbox"}
              size={focused ? 25 : 20}
              color={focused ? "#ffffff" : "#ffffff80"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Calls"
        component={CallsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={"call"}
              size={focused ? 25 : 20}
              color={focused ? "#ffffff" : "#ffffff80"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Users"
        component={UsersScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={"people"}
              size={focused ? 25 : 20}
              color={focused ? "#ffffff" : "#ffffff80"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={"notifications"}
              size={focused ? 25 : 20}
              color={focused ? "#ffffff" : "#ffffff80"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={"settings"}
              size={focused ? 25 : 20}
              color={focused ? "#ffffff" : "#ffffff80"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
