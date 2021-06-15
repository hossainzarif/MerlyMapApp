import React, { useState, useEffect } from "react"
import { StyleSheet } from "react-native"
import { View, Text } from "react-native"
import { db } from "../utils/firebase"

const FlaggedPostDetailsScreen = ({ route }) => {
  const { name, user_id, email } = route.params
  const [loading, setloading] = useState(false)

  const loadPosts = async () => {
    try {
      setloading(true)
      await db
        .collection("users")
        .doc(user_id)
        .collection("flaggers")
        .onSnapshot((querySnapshot) => {
          let temp_posts = []
          querySnapshot.forEach((doc) => {
            temp_posts.push({
              id: doc.id,
              data: doc.data(),
            })
          })
          setloading(false)
        })
    } catch (error) {
      Alert.alert("Error:", error.message)

      setloading(false)
    }
  }

  useEffect(() => {
    loadPosts()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.textdata}>User Name : {name}</Text>
      <Text style={styles.textdata}>User Id : {user_id}</Text>
      <Text style={styles.textdata}>User Email : {email}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  textdata: {
    fontSize: 18,
    textAlign: "center",
    padding: 20,
  },
})
export default FlaggedPostDetailsScreen
