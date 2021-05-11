import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import MapScreen from '../screens/MapScreen'
const AppStack = () => {
  appstack = createStackNavigator()
  return (
    <appstack.Navigator>
      <appstack.Screen name='MapScreen' component={MapScreen} />
    </appstack.Navigator>
  )
}

export default AppStack
