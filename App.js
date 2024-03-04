import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import Home from './screens/Home'
import Away from './screens/Away'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: true }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Away" component={Away}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#6ae8ff'
            },
            headerShadowVisible: true

          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  )
}
