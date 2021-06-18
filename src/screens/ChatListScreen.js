import React, { useEffect, useState } from "react"
import { View, Text, Alert } from "react-native"
import { db } from "../utils/firebase"

const ChatListScreen = () => {
  const [AllMessage, setAllMessage] = useState([])

  const loadPosts = async () => {
    try {
      await db.collection("chatrooms").onSnapshot((querySnapshot) => {
        let temp_posts = []

        console.log(querySnapshot)
      })
    } catch (error) {
      Alert.alert("Error:", error.message)
    }
  }

  useEffect(() => {
    loadPosts()
  }, [])
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Chat List</Text>
    </View>
  )
}

export default ChatListScreen
