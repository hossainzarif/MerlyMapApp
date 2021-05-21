import React from 'react'
import { Text } from 'react-native'
import { Card } from 'react-native-elements'

const DateCard = () => {
  return (
    <Card
      containerStyle={{
        padding: 0,
        borderRadius: 30,
        height: 30,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>12:30 </Text>
    </Card>
  )
}

export default DateCard
