import React from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
} from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import colors from '../../assets/data/colors'

const FlaggedCommentsCard = (props) => {
  const {
    onPress,
    title,
    details,
    img,
    onPress_delete,
    name,
    user_id,
    comments,
    reason,
  } = props

  return (
    <TouchableOpacity onPress={onPress}>
      <Card
        containerStyle={{
          borderRadius: 10,
          elevation: 5,
        }}
      >
        <Text style={styles.titleText}> Reason: {reason}</Text>
        <Text style={styles.titleText}> Comments: {comments}</Text>
      </Card>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  imgStyle: {
    resizeMode: 'contain',
    marginBottom: 10,
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  titleText: { width: '90%', fontSize: 18 },
})

export default FlaggedCommentsCard
