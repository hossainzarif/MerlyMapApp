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
import ContactScreen from "../screens/ContactScreen"
import AdminContacts from "../screens/AdminContacts"
const NoteStack = ({ navigation }) => {
  adminnote = createStackNavigator()
  return (
    <adminnote.Navigator
      initialRouteName='AdminContact'
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.white,
      }}
    >
      <adminnote.Screen
        name='AdminContact'
        component={AdminContacts}
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
    </adminnote.Navigator>
  )
}

export default NoteStack
