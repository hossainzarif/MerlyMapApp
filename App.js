import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import AuthStack from './src/navigation/AuthStack'
import { Value } from 'react-native-reanimated'
import OnboardStack from './src/navigation/OnboardStack'
export default function App() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null)

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then((value) => {
      if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true')
        setIsFirstLaunch(true)
      } else {
        setIsFirstLaunch(true)
      }
    })
  }, [])

  if (isFirstLaunch == null) {
    return (
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    )
  } else {
    return (
      <NavigationContainer>
        <OnboardStack />
      </NavigationContainer>
    )
  }
}
