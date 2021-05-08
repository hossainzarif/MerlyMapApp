import React from 'react'
import { Text, StyleSheet, View, Pressable } from 'react-native'
import colors from '../../../assets/data/colors'
import { Button } from 'react-native-elements'
import { HEIGHT_BUTTON, BUTTON_RADIUS } from '../../constants/Height_Width'
const CurvedButton = (props) => {
  const { btnText } = props
  return (
    <Button
      containerStyle={styles.containerStyle}
      buttonStyle={styles.buttonStyle}
      title={btnText}
      raised
    />
  )
}

const styles = StyleSheet.create({
  containerStyle: {
    borderRadius: BUTTON_RADIUS,
    height: HEIGHT_BUTTON,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonStyle: {
    backgroundColor: colors.primary,
    borderRadius: BUTTON_RADIUS,
    height: HEIGHT_BUTTON,
  },
})

export default CurvedButton
