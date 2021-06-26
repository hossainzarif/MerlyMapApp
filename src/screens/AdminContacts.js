import React from "react"
import { useState, useEffect } from "react"
import { View, Text, FlatList } from "react-native"
import NoteCard from "../cards/NoteCard"
import { Button } from "react-native-elements"
import { db } from "../utils/firebase"
import Loading from "../custom/Loading"
const AdminContacts = ({ navigation }) => {
  const [loading, setloading] = useState(false)
  const [notes, setNotes] = useState([])

  const loadPosts = async () => {
    try {
      setloading(true)
      await db
        .collection("notes")
        .orderBy("timestamp", "desc")
        .onSnapshot((querySnapshot) => {
          let temp_posts = []
          querySnapshot.forEach((doc) => {
            temp_posts.push({
              id: doc.id,
              data: doc.data(),
            })
          })
          setNotes(temp_posts)
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

  if (loading) {
    return <Loading />
  } else {
    return (
      // <View>
      //   <NoteCard />
      //   <Button
      //     onPress={() => {
      //       console.log(notes)
      //     }}
      //   ></Button>
      // </View>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <FlatList
          data={notes}
          contentContainerStyle={{
            flexGrow: 1,
          }}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <NoteCard
                name={item.data.sender_name}
                email={item.data.sender_email}
                messages={item.data.sender_message}
                onPres={() => {
                  navigation.navigate("AllNotes", {
                    name: item.data.sender_name,
                    email: item.data.sender_email,
                    messages: item.data.sender_message,
                  })
                }}
              />
            )
          }}
        ></FlatList>
        {/* {console.log(TotArr[0].data.recent_Update.toDate())} */}
      </View>
    )
  }
}

export default AdminContacts
