import React, { useContext } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { AuthContext } from '../Providers/AuthProvider'

const MapScreen = () => {
  const { user } = useContext(AuthContext)

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 15 }}>THIS IS MAP {user.displayName}</Text>
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
