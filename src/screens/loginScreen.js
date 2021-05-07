import React from 'react'
import { Text, StyleSheet, View, Pressable } from 'react-native'
import CurvedButton from '../components/CurvedButton'
import colors from '../../assets/data/colors'
const loginScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.buttoncontainer}>
        <CurvedButton btnText='HI!'></CurvedButton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  buttoncontainer: {
    position: 'absolute',
    bottom: 50,
    width: '70%',
  },
})

export default loginScreen
