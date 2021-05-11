import React from 'react'
import AppStack from './AppStack'

import { createDrawerNavigator } from '@react-navigation/drawer'
import MapScreen from '../screens/MapScreen'

const DrawerNav = () => {
  const Drawer = createDrawerNavigator()

  return (
    <Drawer.Navigator>
      <Drawer.Screen name='Map' component={AppStack} />
    </Drawer.Navigator>
  )
}

export default DrawerNav
