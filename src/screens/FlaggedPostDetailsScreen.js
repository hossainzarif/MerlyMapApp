import React, { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { View, Text } from 'react-native'
import Loading from '../custom/Loading'
import { db } from '../utils/firebase'
import { AntDesign } from '@expo/vector-icons'
import colors from '../../assets/data/colors'
const FlaggedPostDetailsScreen = ({ route }) => {
  const { name, user_id, email, post_id } = route.params
  const [loading, setloading] = useState(false)
  const [flaggers, setflaggers] = useState(0)
  const [totalflags, settotalflags] = useState(0)

  const loadPosts = async () => {
    try {
      setloading(true)
      await db
        .collection('users')
        .doc(user_id)
        .collection('flaggers')
        .onSnapshot((querySnapshot) => {
          setflaggers(querySnapshot.size)
          setloading(false)
          console.log(flaggers)
        })
    } catch (error) {
      Alert.alert('Error:', error.message)

      setloading(false)
    }
  }
  const loadFlaggers = async () => {
    try {
      setloading(true)

      await db
        .collection('posts')
        .doc(post_id)
        .collection('flaggers')
        .onSnapshot((querySnapshot) => {
          settotalflags(querySnapshot.size)

          setloading(false)
        })
    } catch (error) {
      Alert.alert('Error:', error.message)

      setloading(false)
    }
  }

  useEffect(() => {
    loadPosts()
    loadFlaggers()
  }, [])

  if (loading) {
    return <Loading />
  } else {
    return (
      <View style={styles.container}>
        {flaggers >= 3 ? (
          <AntDesign name='warning' size={60} color={colors.warning} />
        ) : null}
        <Text style={styles.textdata}>User Name : {name}</Text>
        <Text style={styles.textdata}>User Id : {user_id}</Text>
        <Text style={styles.textdata}>User Email : {email}</Text>
        <Text style={styles.textdata}>
          Post Flagged By : {totalflags} Users
        </Text>

        <Text style={styles.textdata}> User Flagged By : {flaggers} Users</Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textdata: {
    fontSize: 18,
    textAlign: 'center',
    padding: 20,
  },
})
export default FlaggedPostDetailsScreen
