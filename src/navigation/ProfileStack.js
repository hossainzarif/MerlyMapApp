import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import MapScreen from "../screens/MapScreen"
import colors from "../../assets/data/colors"
import { Entypo } from "@expo/vector-icons"

import ProfileScreen from "../screens/ProfileScreen"
import ChangePassword from "../screens/ChangePassword"
import ImagePickerFunc from "../custom/ImagePicker"
import PostDetails from "../screens/PostDetails"
const ProfileStack = ({ navigation }) => {
  profilestack = createStackNavigator()
  return (
    <profilestack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.white,
      }}
    >
      <profilestack.Screen
        name='ProfileScreen'
        component={ProfileScreen}
        options={{
          title: "",
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
      <profilestack.Screen
        name='ChangePassword'
        component={ChangePassword}
        options={{
          title: "",
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

      <profilestack.Screen
        name='ImagePicker'
        component={ImagePickerFunc}
        options={{
          title: "",
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
      <profilestack.Screen
        name='Details'
        component={PostDetails}
        options={{
          title: "",
          headerLeft: () => (
            <Feather
              name='arrow-left'
              size={32}
              color={colors.white}
              style={{ padding: 10 }}
              onPress={() => {
                navigation.navigate("ProfileScreen")
              }}
            />
          ),
        }}
      />
    </profilestack.Navigator>
  )
}

export default ProfileStack
