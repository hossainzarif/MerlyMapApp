import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SignInScreen from '../screens/SignInScreen'
import SignUpScreen from '../screens/SignUpScreen'
import WelcomeScreen from '../screens/WelcomeScreen'
import OnboardingScreen from '../screens/OnboardingScreen'
import MapScreen from '../screens/MapScreen'

const AuthStack = () => {
  authstack = createStackNavigator()

  return (
    <authstack.Navigator>
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
      <authstack.Screen name='MapScreen' component={MapScreen} />
    </authstack.Navigator>
  )
}

export default AuthStack
