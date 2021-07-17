import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import FlaggedPostScreen from '../screens/FlaggedPostScreen'
import colors from '../../assets/data/colors'
import { Feather } from '@expo/vector-icons'
import FlaggedPostDetailsScreen from '../screens/FlaggedPostDetailsScreen'
import { ICON_SIZE_HEADER } from '../constants/Height_Width'
import FlagDetailsScreen from '../screens/FlagDetailsScreen'

const AdminStack = ({ navigation }) => {
  adminstack = createStackNavigator()
  return (
    <adminstack.Navigator
      initialRouteName='FlaggedPost'
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.white,
      }}
    >
      <adminstack.Screen
        name='FlaggedPost'
        component={FlaggedPostScreen}
        options={{
          title: '',
          headerLeft: () => (
            <Feather
              name='arrow-left'
              size={ICON_SIZE_HEADER}
              color={colors.white}
              style={{ padding: 10 }}
              onPress={() => {
                navigation.navigate('Home')
              }}
            />
          ),
        }}
      />
      <adminstack.Screen
        name='FlaggedPostDetails'
        component={FlaggedPostDetailsScreen}
        options={{
          title: '',
          headerLeft: () => (
            <Feather
              name='arrow-left'
              size={ICON_SIZE_HEADER}
              color={colors.white}
              style={{ padding: 10 }}
              onPress={() => {
                navigation.navigate('FlaggedPost')
              }}
            />
          ),
        }}
      />
      <adminstack.Screen
        name='FlagDetails'
        component={FlagDetailsScreen}
        options={{
          title: '',
          headerLeft: () => (
            <Feather
              name='arrow-left'
              size={ICON_SIZE_HEADER}
              color={colors.white}
              style={{ padding: 10 }}
              onPress={() => {
                navigation.navigate('FlaggedPost')
              }}
            />
          ),
        }}
      />
    </adminstack.Navigator>
  )
}

export default AdminStack
