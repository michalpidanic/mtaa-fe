import { StatusBar } from 'expo-status-bar';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatsScreen from './screens/chats_screen';
import CallsScreen from './screens/calls_screen';
import UsersScreen from './screens/users_screen';
import NotificationsScreen from './screens/notifications_screen';
import SettingsScreen from './screens/settings_screen';
import { Ionicons } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen 
          name = "Chats" 
          component={ChatsScreen} 
          options={{tabBarIcon : ({focused}) => 
            (<Ionicons name={focused ? "chatbox" : "chatbox-outline"} size = {30} />) 
          }} />
        <Tab.Screen 
          name= "Calls" 
          component={CallsScreen} 
          options={{tabBarIcon : ({focused}) => 
            (<Ionicons name={focused ? "call" : "call-outline"} size = {30} />) 
          }} />
        <Tab.Screen 
          name= "Users" 
          component={UsersScreen} 
          options={{tabBarIcon : ({focused}) => 
            (<Ionicons name={focused ? "people" : "people-outline"} size = {30} />) 
          }}/>
        <Tab.Screen 
          name= "Notifications" 
          component={NotificationsScreen} 
          options={{tabBarIcon : ({focused}) => 
            (<Ionicons name={focused ? "notifications" : "notifications-outline"} size = {30} />) 
          }}/>
        <Tab.Screen 
          name= "Settings" 
          component={SettingsScreen} 
          options={{tabBarIcon : ({focused}) => 
            (<Ionicons name={focused ? "settings" : "settings-outline"} size = {30} />) 
          }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
