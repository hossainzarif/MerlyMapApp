import React from 'react'
import { Text } from 'react-native'
import { Card } from 'react-native-elements'
import colors from '../../assets/data/colors'
import { Entypo } from '@expo/vector-icons'
import { View } from 'react-native'
const DateCard = (props) => {
  return (
    <Card
      containerStyle={{
        padding: 0,
        borderRadius: 30,
        height: 30,
        width: 220,
        justifyContent: 'center',
        borderColor: colors.primary,
        paddingLeft: 10,
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

        <Entypo name='cross' size={24} color='red' />
      </View>
    </Card>
  )
}

export default DateCard
