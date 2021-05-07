import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'

import AppStack from './src/navigation/AppStack'
export default function App() {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  )
}
