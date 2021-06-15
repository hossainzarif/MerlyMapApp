import React, { useState } from "react"
import { StyleSheet } from "react-native"
import { View, Text } from "react-native"

const FlaggedPostDetailsScreen = ({ route }) => {
  const { name, user_id } = route.params
  const [loading, setloading] = useState(false)

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 18 }}>User Name : {name}</Text>
      <Text style={{ fontSize: 18 }}>User Id : {user_id}</Text>
      <Text style={{ fontSize: 18 }}>User Email : {user_id}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})
export default FlaggedPostDetailsScreen
