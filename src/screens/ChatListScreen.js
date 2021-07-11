import React, { useContext, useEffect, useState } from 'react'
import { View, Text, Alert, FlatList } from 'react-native'
import { db } from '../utils/firebase'
import { Button } from 'react-native-elements'
import { AuthContext } from '../Providers/AuthProvider'
import { Card, ListItem } from 'react-native-elements'
import ChatCard from '../cards/ChatCard'
import Loading from '../custom/Loading'
import colors from '../../assets/data/colors'

const ChatListScreen = ({ navigation }) => {
  const [AllMessage, setAllMessage] = useState([])
  const [AllMessage_2, setAllMessage_2] = useState([])
  const [loading, setloading] = useState(false)

  const { user } = useContext(AuthContext)
  const [sorted, setSorted] = useState([])
  const loadPosts = async () => {
    setloading(true)
    try {
      await db
        .collection('chatrooms')
        // .where("sentTo", "==", user.uid)
        .where('sentBy', '==', user.uid)
        .orderBy('recent_Update', 'desc')

        .onSnapshot((querySnapshot) => {
          let temp_posts = []
          querySnapshot.forEach((doc) => {
            temp_posts.push({
              id: doc.id,
              data: doc.data(),
            })
          })
          setAllMessage(temp_posts)
        })
    } catch (error) {
      setloading(false)

      Alert.alert('Error:', error.message)
    }
  }
  const loadPosts_2 = async () => {
    setloading(true)

    try {
      await db
        .collection('chatrooms')
        // .where("sentTo", "==", user.uid)
        .where('sentTo', '==', user.uid)
        .orderBy('recent_Update', 'desc')

        .onSnapshot((querySnapshot) => {
          let temp_posts = []
          querySnapshot.forEach((doc) => {
            temp_posts.push({
              id: doc.id,
              data: doc.data(),
            })
          })
          setAllMessage_2(temp_posts)
          setloading(false)
        })
    } catch (error) {
      setloading(false)

      Alert.alert('Error:', error.message)
    }
  }

  useEffect(() => {
    loadPosts()
    loadPosts_2()

    const Ax = TotArr.sort(function (x, y) {
      return x.data.recent_Update - y.data.recent_Update
    })

    // setSorted(Ax)
    console.log(Ax)
  }, [])
  const TotArr = AllMessage_2.concat(AllMessage)
  // const sortedArr = TotArr.sort(
  //   (a, b) =>
  //     b.data.recent_Update.localeCompare.toDate()(
  //       a.data.recent_Update.toDate()
  //     ) ||
  //     b.data.recent_Update.localeCompare.toDate()(a.data.recent_Update.toDate())
  // )
  // console.log(sortedArr)
  // console.log(TotArr)

  if (loading) {
    return <Loading />
  } else {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        {TotArr.length > 0 ? (
          <FlatList
            data={TotArr}
            contentContainerStyle={{
              flexGrow: 1,
            }}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              const nm =
                item.data.sentTo == user.uid
                  ? item.data.sentBy
                  : item.data.sentTo

              return (
                <ChatCard
                  name={
                    item.data.sentTo_name == user.displayName
                      ? item.data.sentBy_name
                      : item.data.sentTo_name
                  }
                  sender={item.data.recent_sender}
                  msg_text={item.data.recent_message}
                  onPress={() => {
                    navigation.navigate('Chat', {
                      seller_name:
                        item.data.sentTo_name == user.displayName
                          ? item.data.sentBy_name
                          : item.data.sentTo_name,
                      seller_id: nm,
                    })
                  }}
                />
              )
            }}
          ></FlatList>
        ) : (
          <View style={{ alignItems: 'center' }}>
            <Text
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                padding: 100,
                fontSize: 20,
                color: colors.darkGray,
              }}
            >
              NO POST YET
            </Text>
          </View>
        )}

        {/* {console.log(TotArr[0].data.recent_Update.toDate())} */}
      </View>
    )
  }
}

export default ChatListScreen
