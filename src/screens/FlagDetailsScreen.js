import React from 'react'
import { useState } from 'react'
import { View, Text } from 'react-native'

const FlagDetailsScreen = ({ route, navigation }) => {
  const { post_id } = route.params
  const [FlaggedPost, setFlaggedPost] = useState([])

  return (
    <View>
      <Text>{post_id}</Text>
    </View>
  )
}

export default FlagDetailsScreen
