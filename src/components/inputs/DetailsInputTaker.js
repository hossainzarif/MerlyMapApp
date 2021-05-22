import React from 'react'
import { Text, StyleSheet } from 'react-native'

import { Input } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons'
import colors from '../../../assets/data/colors'
import {
  HEIGHT_INPUT,
  INPUT_RADIUS,
  ICON_SIZE_MED,
  HEIGHT_INPUT_DETAILS,
} from '../../constants/Height_Width'
import { MaterialIcons } from '@expo/vector-icons'
const DetailsInputTaker = (props) => {
  const { onChangeText } = props

  return (
    <Input
      multiline={true}
      inputStyle={styles.input}
      containerStyle={styles.textInput}
      inputContainerStyle={styles.inputcontainer}
      style={styles.fontStyle}
      onChangeText={onChangeText}
    />
  )
}
const styles = StyleSheet.create({
  textInput: {
    marginTop: 10,
    marginBottom: 5,
    borderWidth: 1,
    height: HEIGHT_INPUT_DETAILS,
    borderRadius: 10,
    borderColor: colors.primary,
    backgroundColor: colors.primary_fade,
  },
  inputcontainer: { borderBottomWidth: 0 },
  input: { paddingLeft: 5 },
  fontStyle: { fontSize: 15 },
})
export default DetailsInputTaker
