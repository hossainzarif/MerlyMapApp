import React, { useEffect } from 'react'
import { useState } from 'react'
import { TouchableOpacity, Alert } from 'react-native'
import { View, Text } from 'react-native'
import FlaggedCommentsCard from '../cards/FlaggedCommentsCard'
import { db } from '../utils/firebase'

const FlagDetailsScreen = ({ route, navigation }) => {
  const { post_id } = route.params
  const [FlaggedPost, setFlaggedPost] = useState([])
  const [loading, setloading] = useState(false)

  const loadPosts = async () => {
    try {
      await db
        .collection('posts')
        .doc(post_id)
        .collection('flaggers')
        .onSnapshot((querySnapshot) => {
          let temp_posts = []
          querySnapshot.forEach((doc) => {
            temp_posts.push({
              id: doc.id,
              data: doc.data(),
            })
          })
          setFlaggedPost(temp_posts)
          console.log(FlaggedPost)
        })
    } catch (error) {
      Alert.alert('Error:', error.message)
    }
  }

  useEffect(() => {
    loadPosts()
  }, [])

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          console.log(FlaggedPost)
        }}
      ></TouchableOpacity>

      {FlaggedPost.map((item) => (
        <FlaggedCommentsCard
          key={item.id}
          reason={item.data.reason}
          comments={item.data.comments}
        />
      ))}
    </View>
  )
}

export default FlagDetailsScreen
