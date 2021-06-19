import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import MapScreen from "../screens/MapScreen"
import colors from "../../assets/data/colors"
import { Entypo } from "@expo/vector-icons"
import PostSalesScreen from "../screens/PostSalesScreen"
import { Feather } from "@expo/vector-icons"
import PostDetails from "../screens/PostDetails"
import ChatScreen from "../screens/ChatScreen"
import { ICON_SIZE_HEADER } from "../constants/Height_Width"
import ChatListScreen from "../screens/ChatListScreen"
const ChatStack = ({ navigation }) => {
  appstack = createStackNavigator()
  return (
    <appstack.Navigator
      initialRouteName='Chatinbox'
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.white,
      }}
    >
      <appstack.Screen
        name='Chatinbox'
        component={ChatListScreen}
        options={{
          title: "",
          headerLeft: () => (
            <Entypo
              name='menu'
              size={ICON_SIZE_HEADER}
              color={colors.white}
              style={{ padding: 10 }}
              onPress={() => {
                navigation.openDrawer()
              }}
            />
          ),
        }}
      />
      <appstack.Screen
        name='Chat'
        component={ChatScreen}
        options={({ route }) => ({
          headerTitleAlign: "center",

          title: route.params.seller_name,
          headerLeft: () => (
            <Feather
              name='arrow-left'
              size={ICON_SIZE_HEADER}
              color={colors.white}
              style={{ padding: 10 }}
              onPress={() => {
                navigation.navigate("Chatinbox")
              }}
            />
          ),
        })}
      />
    </appstack.Navigator>
  )
}

export default ChatStack
