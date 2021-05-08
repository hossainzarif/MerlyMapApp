import React from 'react'
import { Text, StyleSheet } from 'react-native'

import { Input } from 'react-native-elements'
import { MaterialIcons } from '@expo/vector-icons'
import colors from '../../../assets/data/colors'
import {
  HEIGHT_INPUT,
  INPUT_RADIUS,
  ICON_SIZE_MED,
} from '../../constants/Height_Width'

const PasswordInputTaker = () => {
  return (
    <Input
      leftIcon={
        <MaterialIcons
          name='lock'
          size={ICON_SIZE_MED}
          color={colors.primary}
        />
      }
      placeholder='Password'
      inputStyle={styles.input}
      containerStyle={styles.textInput}
      inputContainerStyle={styles.inputcontainer}
      secureTextEntry={true}
      style={styles.fontStyle}
    />
  )
}

const styles = StyleSheet.create({
  textInput: {
    marginTop: 10,
    marginBottom: 5,
    borderWidth: 1,
    height: HEIGHT_INPUT,
    borderRadius: INPUT_RADIUS,
    borderColor: colors.primary,
    backgroundColor: colors.primary_fade,
  },
  inputcontainer: { borderBottomWidth: 0 },
  input: { paddingLeft: 5 },
  fontStyle: { fontSize: 15 },
})

export default PasswordInputTaker
