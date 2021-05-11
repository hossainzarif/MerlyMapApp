import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SignInScreen from '../screens/SignInScreen'
import SignUpScreen from '../screens/SignUpScreen'
import WelcomeScreen from '../screens/WelcomeScreen'
import OnboardingScreen from '../screens/OnboardingScreen'
const OnboardStack = () => {
  onboardstack = createStackNavigator()
  return (
    <onboardstack.Navigator>
      <onboardstack.Screen
        name='OnboardingScreen'
        component={OnboardingScreen}
        options={{
          headerShown: false,
        }}
      />
      <onboardstack.Screen
        name='WelcomeScreen'
        component={WelcomeScreen}
        options={{
          headerShown: false,
        }}
      />

      <onboardstack.Screen
        name='SignInScreen'
        component={SignInScreen}
        options={{
          headerShown: false,
        }}
      />
      <onboardstack.Screen
        name='SignUpScreen'
        component={SignUpScreen}
        options={{
          headerShown: false,
        }}
      />
    </onboardstack.Navigator>
  )
}

export default OnboardStack
