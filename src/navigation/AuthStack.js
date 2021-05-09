import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SignInScreen from '../screens/SignInScreen'
import SignUpScreen from '../screens/SignUpScreen'
import WelcomeScreen from '../screens/WelcomeScreen'
const AuthStack = () => {
  authstack = createStackNavigator()

  return (
    <authstack.Navigator initialRouteName='WelcomeScreen'>
      <authstack.Screen
        name='WelcomeScreen'
        component={WelcomeScreen}
        options={{
          headerShown: false,
        }}
      />

      <authstack.Screen
        name='SignInScreen'
        component={SignInScreen}
        options={{
          headerShown: false,
        }}
      />
      <authstack.Screen
        name='SignUpScreen'
        component={SignUpScreen}
        options={{
          headerShown: false,
        }}
      />
    </authstack.Navigator>
  )
}

export default AuthStack
