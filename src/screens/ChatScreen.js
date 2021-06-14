import { View, Text } from "react-native"
import React, { useState, useCallback, useEffect } from "react"
import { GiftedChat, Bubble } from "react-native-gifted-chat"
import colors from "../../assets/data/colors"

const ChatScreen = ({ route }) => {
  const [messages, setMessages] = useState([])
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: require("../../assets/av_ed.png"),
        },
      },
    ])
  }, [])
  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    )
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
  return (
    <GiftedChat
      renderBubble={renderBubble}
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
  )
}

export default ChatScreen
