import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import AuthStack from './src/navigation/AuthStack'
import { Value } from 'react-native-reanimated'
import OnboardStack from './src/navigation/OnboardStack'
import DrawerNav from './src/navigation/DrawerNav'
export default function App() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then((value) => {
      if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true')
        setIsFirstLaunch(true)
      } else {
        setIsFirstLaunch(false)
      }
    })

    AsyncStorage.getItem('loggedIn').then((value) => {
      if (value != null) {
        setIsLoggedIn(true)
      }
    })
  }, [])

  if (isFirstLaunch == null) {
    return null
  } else if (isFirstLaunch == true) {
    return (
      <NavigationContainer>
        <OnboardStack />
      </NavigationContainer>
    )
  } else {
    return (
      <NavigationContainer>
        {isLoggedIn ? <DrawerNav /> : <AuthStack />}
      </NavigationContainer>
    )
  }
}
