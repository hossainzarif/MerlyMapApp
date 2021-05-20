import React, { useContext } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { AuthContext } from '../Providers/AuthProvider'
import { FAB } from 'react-native-paper'
import colors from '../../assets/data/colors'

const MapScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext)

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 15 }}>THIS IS MAP {user.displayName}</Text>
      <FAB
        style={styles.fab}
        large
        icon='plus'
        onPress={() => navigation.navigate('PostSales')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 10,
    bottom: 20,
    backgroundColor: colors.primary,
  },
})
export default MapScreen
