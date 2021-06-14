import { View, Text } from "react-native"
import React, {
  useState,
  useCallback,
  useEffect,
  useContext,
  useLayoutEffect,
} from "react"
import { GiftedChat, Bubble } from "react-native-gifted-chat"
import colors from "../../assets/data/colors"
import { AuthContext } from "../Providers/AuthProvider"
import { db } from "../utils/firebase"
import * as firebase from "firebase"
import Loading from "../custom/Loading"

const ChatScreen = () => {
  const [messages, setMessages] = useState([])
  const { user } = useContext(AuthContext)
  const [chatLoading, setchatLoading] = useState(false)

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
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    )

    const { _id, createdAt, text, user } = messages[0]
    firebase.firestore().collection("chats").add({
      _id,
      createdAt,
      text,
      user,
    })
  }, [])

  useLayoutEffect(() => {
    setchatLoading(true)
    const unsubscribe = db
      .collection("chats")
      .orderBy("createdAt", "desc")
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

  if (chatLoading) {
    return <Loading />
  } else {
    return (
      <GiftedChat
        renderBubble={renderBubble}
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: user.uid,
          name: user.displayName,
        }}
      />
    )
  }
}

export default ChatScreen
