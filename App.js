import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import Home from './screens/Home'
import Away from './screens/Away'
import Task from './screens/Task'
import Task2 from './screens/Task2'
import Task3 from './screens/Task3'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Task"
        screenOptions={{ headerShown: true }}
      >
        <Stack.Screen name="Task3" component={Task3} />
        <Stack.Screen name="Task2" component={Task2} />
        <Stack.Screen name="Task" component={Task} />

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
