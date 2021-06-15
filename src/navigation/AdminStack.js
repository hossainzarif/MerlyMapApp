import { View, Text } from "react-native"
import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
const AdminStack = () => {
  adminstack = createStackNavigator()
  return (
    <adminstack.Navigator
      initialRouteName='MapScreen'
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.white,
      }}
    >
      <adminstack.Screen
        name='PostSales'
        component={PostSalesScreen}
        options={{
          title: "",
          headerLeft: () => (
            <Feather
              name='arrow-left'
              size={32}
              color={colors.white}
              style={{ padding: 10 }}
              onPress={() => {
                navigation.navigate("MapScreen")
              }}
            />
          ),
        }}
      />

      <adminstack.Screen
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
                navigation.navigate("MapScreen")
              }}
            />
          ),
        }}
      />
      <adminstack.Screen
        name='Chat'
        component={ChatScreen}
        options={({ route }) => ({
          title: route.params.seller_name,
          headerLeft: () => (
            <Feather
              name='arrow-left'
              size={32}
              color={colors.white}
              style={{ padding: 10 }}
              onPress={() => {
                // navigation.navigate("MapScreen")
                console.log(route.params)
              }}
            />
          ),
        })}
      />
    </adminstack.Navigator>
  )
}

export default AdminStack
