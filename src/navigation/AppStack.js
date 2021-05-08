import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import loginScreen from '../screens/loginScreen'
import SignUpScreen from '../screens/SignUpScreen'
const AppStack = () => {
  appstack = createStackNavigator()

  return (
    <appstack.Navigator>
      <appstack.Screen
        name='loginScreen'
        component={loginScreen}
        options={{
          headerShown: false,
        }}
      />
      <appstack.Screen
        name='SignUpScreen'
        component={SignUpScreen}
        options={{
          headerShown: false,
        }}
      />
    </appstack.Navigator>
  )
}

export default AppStack
