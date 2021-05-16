import React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import colors from '../../assets/data/colors'
const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' color={colors.primary} animating={true} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Loading
