import React, { useState, useEffect } from "react"
import { View, Text, Alert } from "react-native"
import FlaggedPostCard from "../cards/FlaggedPostCard"
import { db } from "../utils/firebase"
const FlaggedPostScreen = () => {
  const [flaggedPost, setflaggedPost] = useState([])
  const [loading, setloading] = useState(false)
  const loadPosts = async () => {
    try {
      setloading(true)
      await db
        .collection("posts")
        .where("flagged", "==", true)
        .orderBy("timestamp", "desc")
        .onSnapshot((querySnapshot) => {
          let temp_posts = []
          querySnapshot.forEach((doc) => {
            temp_posts.push({
              id: doc.id,
              data: doc.data(),
            })
          })
          setflaggedPost(temp_posts)
          setloading(false)
          console.log(flaggedPost)
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
    <View>
      {/* {flaggedPost.map((item) => (
        <FlaggedPostCard
          key={item.id}
          title={item.data.title}
          details={item.data.details}
          onPress_delete={() => {
            Alert.alert(
              "Delete Post",
              "Are you sure you want to delete your post?",
              [
                {
                  text: "Cancel",
                  style: "cancel",
                },
                {
                  text: "Confirm",
                  onPress: () => {
                    // deletePost(item.id, item.data.pictures)
                  },
                },
              ],
              { cancelable: true }
            )
          }}
          //   onPress={() => {
          //     navigation.navigate("Details", {
          //       address: item.data.location.coords.address,
          //       images: item.data.pictures,
          //       details: item.data.details,
          //       dates: item.data.dates,
          //       user_id: item.data.user,
          //     })
          //   }}
        />
      ))} */}
      <Text>THIS IS </Text>
    </View>
  )
}

export default FlaggedPostScreen
