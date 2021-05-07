import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import loginScreen from '../screens/loginScreen'

const AppStack = () => {
  appstack = createStackNavigator()

  return (
    <appstack.Navigator>
      <appstack.Screen name='loginScreen' component={loginScreen} />
    </appstack.Navigator>
  )
}

export default AppStack
