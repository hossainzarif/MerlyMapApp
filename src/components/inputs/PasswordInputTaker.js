import React, { useState } from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'

import { Input } from 'react-native-elements'
import { MaterialIcons, Entypo } from '@expo/vector-icons'
import colors from '../../../assets/data/colors'
import {
  HEIGHT_INPUT,
  INPUT_RADIUS,
  ICON_SIZE_MED,
} from '../../constants/Height_Width'

const PasswordInputTaker = (props) => {
  const [passshow, setshow] = useState(false)

  const handleEye = () => {
    if (passshow) {
      setshow(false)
    } else {
      setshow(true)
    }
  }
  return (
    <Input
      leftIcon={
        <MaterialIcons
          name='lock'
          size={ICON_SIZE_MED}
          color={colors.primary}
        />
      }
      rightIcon={
        <TouchableOpacity onPress={handleEye}>
          {passshow ? (
            <Entypo name='eye' size={ICON_SIZE_MED} color={colors.primary} />
          ) : (
            <Entypo
              name='eye-with-line'
              size={ICON_SIZE_MED}
              color={colors.primary}
            />
          )}
        </TouchableOpacity>
      }
      placeholder='Password'
      inputStyle={styles.input}
      containerStyle={styles.textInput}
      inputContainerStyle={styles.inputcontainer}
      secureTextEntry={!passshow}
      style={styles.fontStyle}
      onChangeText={props.onChangeText}
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
