import React from 'react'
import {
  Text,
  StyleSheet,
  View,
  Pressable,
  TouchableOpacity,
} from 'react-native'
import colors from '../../../assets/data/colors'
const TextButton = (props) => {
  const { textIn, onPress } = props

  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.textStyle}>{textIn}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.primary_dark,
  },
})

export default TextButton
