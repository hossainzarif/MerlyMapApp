import React, { useContext } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { AuthContext } from '../Providers/AuthProvider'
import { FAB } from 'react-native-paper'
import colors from '../../assets/data/colors'

const PostSalesScreen = () => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, backgroundColor: 'blue' }}>
        <Text>NANI</Text>
      </View>
      <View style={{ flex: 1.5, backgroundColor: 'yellow' }}></View>

      <View style={{ flex: 1, backgroundColor: 'green' }}></View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
export default PostSalesScreen
