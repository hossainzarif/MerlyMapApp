import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

const MapScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 15 }}>THIS IS MAP SCREEN</Text>
    </View>
  )
}

export default MapScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
