import React, { useContext, useEffect, useState } from "react"
import { View, Text, Alert, FlatList } from "react-native"
import { db } from "../utils/firebase"
import { Button } from "react-native-elements"
import { AuthContext } from "../Providers/AuthProvider"
import { Card, ListItem } from "react-native-elements"
import ChatCard from "../cards/ChatCard"
import Loading from "../custom/Loading"

const ChatListScreen = ({ navigation }) => {
  const [AllMessage, setAllMessage] = useState([])
  const [AllMessage_2, setAllMessage_2] = useState([])
  const [loading, setloading] = useState(false)

  const { user } = useContext(AuthContext)

  const loadPosts = async () => {
    setloading(true)
    try {
      await db
        .collection("chatrooms")
        // .where("sentTo", "==", user.uid)
        .where("sentBy", "==", user.uid)

        .onSnapshot((querySnapshot) => {
          let temp_posts = []
          querySnapshot.forEach((doc) => {
            temp_posts.push({
              id: doc.id,
              data: doc.data(),
            })
          })
          setAllMessage(temp_posts)
        })
    } catch (error) {
      setloading(false)

      Alert.alert("Error:", error.message)
    }
  }
  const loadPosts_2 = async () => {
    setloading(true)

    try {
      await db
        .collection("chatrooms")
        // .where("sentTo", "==", user.uid)
        .where("sentTo", "==", user.uid)

        .onSnapshot((querySnapshot) => {
          let temp_posts = []
          querySnapshot.forEach((doc) => {
            temp_posts.push({
              id: doc.id,
              data: doc.data(),
            })
          })
          setAllMessage_2(temp_posts)
          setloading(false)
        })
    } catch (error) {
      setloading(false)

      Alert.alert("Error:", error.message)
    }
  }
  useEffect(() => {
    loadPosts()
    loadPosts_2()
  }, [])
  const TotArr = AllMessage_2.concat(AllMessage)

  if (loading) {
    return <Loading />
  } else {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <FlatList
          data={TotArr}
          contentContainerStyle={{
            flexGrow: 1,
          }}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const nm =
              item.data.sentTo == user.uid ? item.data.sentBy : item.data.sentTo

            return (
              <ChatCard
                name={
                  item.data.sentTo_name == user.displayName
                    ? item.data.sentBy_name
                    : item.data.sentTo_name
                }
                onPress={() => {
                  navigation.navigate("Chat", {
                    seller_name:
                      item.data.sentTo_name == user.displayName
                        ? item.data.sentBy_name
                        : item.data.sentTo_name,
                    seller_id: nm,
                  })
                }}
              />
            )
          }}
        ></FlatList>
      </View>
    )
  }
}

export default ChatListScreen
