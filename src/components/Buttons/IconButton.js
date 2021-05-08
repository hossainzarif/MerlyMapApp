import React from 'react'
import { TouchableOpacity } from 'react-native'

const IconButton = (props) => {
  const { icon, onpress } = props

  return <TouchableOpacity onPress={onpress}>{icon}</TouchableOpacity>
}
export default IconButton
