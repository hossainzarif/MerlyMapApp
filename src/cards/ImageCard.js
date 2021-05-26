import React from 'react'
import { View, TouchableOpacity, Image } from 'react-native'
import { Card } from 'react-native-elements'
import { Entypo } from '@expo/vector-icons'
import colors from '../../assets/data/colors'
const ImageCard = (props) => {
  return (
    <Card
      containerStyle={{
        width: 150,
        height: 170,
        borderRadius: 10,
        borderColor: colors.primary,
      }}
    >
      <View style={{ alignItems: 'flex-end' }}>
        <TouchableOpacity onPress={props.onPress}>
          <Entypo name='cross' size={20} color={colors.warning} />
        </TouchableOpacity>
      </View>

      <View style={{ alignItems: 'center', padding: 10 }}>
        <Image
          source={{
            uri: props.uri,
          }}
          style={{
            width: 110,
            height: 110,
            alignItems: 'center',
            resizeMode: 'contain',
          }}
        ></Image>
      </View>
    </Card>
  )
}

export default ImageCard
