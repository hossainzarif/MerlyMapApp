import React from "react"
import AppStack from "./AppStack"

import { createDrawerNavigator } from "@react-navigation/drawer"
import MapScreen from "../screens/MapScreen"

import DrawerContent from "../custom/DrawerContent"
import ProfileScreen from "../screens/ProfileScreen"
import ProfileStack from "./ProfileStack"
import AdminStack from "./AdminStack"
import ChatListScreen from "../screens/ChatListScreen"
const DrawerNav = () => {
  const Drawer = createDrawerNavigator()

  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name='Home' component={AppStack} />
      <Drawer.Screen name='Profile' component={ProfileStack} />
      <Drawer.Screen name='AdminPanel' component={AdminStack} />
      <Drawer.Screen name='Inbox' component={ChatListScreen} />
    </Drawer.Navigator>
  )
}

export default DrawerNav
