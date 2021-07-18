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

const FlaggedPostCard = (props) => {
  const {
    onPress_details,
    title,
    details,
    img,
    onPress_delete,
    name,
    user_id,
    onPress_flags,
  } = props

  return (
    <Card
      containerStyle={{
        borderRadius: 10,
        elevation: 5,
      }}
    >
      <View style={styles.title}>
        <Text style={styles.titleText}>{title}</Text>

        <TouchableOpacity onPress={onPress_delete}>
          <Entypo name='cross' size={30} color={colors.warning} />
        </TouchableOpacity>
      </View>
      <Card.Divider />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button
          title='Check Details'
          onPress={onPress_details}
          buttonStyle={{ backgroundColor: colors.primary }}
        />
        <Button
          title='All Flags'
          buttonStyle={{ backgroundColor: colors.primary }}
          onPress={onPress_flags}
        />
      </View>
    </Card>
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

export default FlaggedPostCard
