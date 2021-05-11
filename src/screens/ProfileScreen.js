import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 15 }}>THIS IS PROFILE SCREEN</Text>
    </View>
  )
}

export default ProfileScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
