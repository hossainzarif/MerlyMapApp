import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { Card } from 'react-native-elements'
import colors from '../../assets/data/colors'
import { Entypo } from '@expo/vector-icons'
import { View } from 'react-native'
const DateValidCard = (props) => {
  return (
    <Card
      containerStyle={{
        padding: 0,
        borderRadius: 50,
        height: 50,
        // width: 330,
        justifyContent: 'center',
        paddingLeft: 10,
        elevation: 3,
        marginBottom: 5,
      }}
    >
      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          padding: 5,
        }}
      >
        <Text> {props.time} </Text>
      </View>
    </Card>
  )
}

export default DateValidCard
