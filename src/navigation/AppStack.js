import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import MapScreen from '../screens/MapScreen'
import colors from '../../assets/data/colors'
import { Entypo } from '@expo/vector-icons'
const AppStack = ({ navigation }) => {
  appstack = createStackNavigator()
  return (
    <appstack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.white,
      }}
    >
      <appstack.Screen
        name='MapScreen'
        component={MapScreen}
        options={{
          title: '',
          headerLeft: () => (
            <Entypo
              name='menu'
              size={32}
              color={colors.white}
              style={{ padding: 10 }}
              onPress={() => {
                navigation.openDrawer()
              }}
            />
          ),
        }}
      />
    </appstack.Navigator>
  )
}

export default AppStack
