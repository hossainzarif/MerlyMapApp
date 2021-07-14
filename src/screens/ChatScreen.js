import { View, Text, ActivityIndicator } from 'react-native'
import React, {
  useState,
  useCallback,
  useEffect,
  useContext,
  useLayoutEffect,
} from 'react'
import { GiftedChat, Bubble } from 'react-native-gifted-chat'
import colors from '../../assets/data/colors'
import { AuthContext } from '../Providers/AuthProvider'
import { db } from '../utils/firebase'
import * as firebase from 'firebase'
import Loading from '../custom/Loading'

const ChatScreen = ({ route }) => {
  const [messages, setMessages] = useState([])
  const { user } = useContext(AuthContext)
  const { seller_id, seller_name } = route.params
  // useEffect(() => {
  //   setMessages([
  //     {
  //       _id: 1,
  //       text: "Hello developer",
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: "React Native",
  //         avatar: require("../../assets/av_ed.png"),
  //       },
  //     },
  //   ])
  // }, [])
  const onSend = useCallback((messages = []) => {
    const msg = messages[0]
    const mymsg = {
      ...msg,
      sentBy: user.uid,
      sentTo: seller_id,
    }
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, mymsg)
    )
    console.log(messages)
    const docid =
      seller_id > user.uid
        ? user.uid + '-' + seller_id
        : seller_id + '-' + user.uid

    const sender = seller_id > user.uid ? user.uid : seller_id
    const rcv = seller_id > user.uid ? seller_id : user.uid
    const sender_name = seller_id > user.uid ? user.displayName : seller_name
    const rcv_name = seller_id > user.uid ? seller_name : user.displayName
    db.collection('chatrooms')
      .doc(docid)
      .set({
        sentBy: sender,
        sentTo: rcv,
        sentBy_name: sender_name,
        sentTo_name: rcv_name,
        recent_Update: firebase.firestore.Timestamp.now(),
        recent_message: mymsg.text,
        recent_sender: mymsg.user.name,
      })
      .then(() => {
        db.collection('chatrooms')
          .doc(docid)
          .collection('messages')
          .add({ ...mymsg, createdAt: firebase.firestore.Timestamp.now() })
      })
  }, [])

  useLayoutEffect(() => {
    const docid =
      seller_id > user.uid
        ? user.uid + '-' + seller_id
        : seller_id + '-' + user.uid

    const unsubscribe = db
      .collection('chatrooms')
      .doc(docid)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            _id: doc.data()._id,
            createdAt: doc.data().createdAt.toDate(),
            text: doc.data().text,
            user: doc.data().user,
          }))
        )
      )

    return unsubscribe
  }, [])

  function renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: colors.primary,
          },
          left: {
            backgroundColor: colors.gray,
          },
        }}
      />
    )
  }

  function renderLoading() {
    return <ActivityIndicator size='large' color='#0000ff' />
  }
  return (
    <GiftedChat
      renderLoading={renderLoading}
      renderBubble={renderBubble}
      messages={messages}
      onSend={(messages) => onSend(messages)}
      showAvatarForEveryMessage={true}
      user={{
        _id: user.uid,
        name: user.displayName,
        avatar: user.photoURL
          ? user.photoURL
          : 'https://firebasestorage.googleapis.com/v0/b/garage-sales-map.appspot.com/o/images%2Favatar%2Favatar.png?alt=media&token=0c100ea8-5ad9-421a-bf2f-2aa058a33d37',
      }}
    />
  )
}

export default ChatScreen
