import React from 'react'
import { Text, StyleSheet, View, Pressable } from 'react-native'
import colors from '../../assets/data/colors'
import { Button } from 'react-native-elements'

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
    borderRadius: 20,
    height: 40,
  },
  buttonStyle: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    height: 40,
  },
})

export default CurvedButton
