import React from "react"
import { View, Text } from "react-native"
import { Card, ListItem } from "react-native-elements"
import { Avatar } from "react-native-paper"
import colors from "../../assets/data/colors"
import UserAvatar from "react-native-user-avatar"
import { TouchableOpacity } from "react-native"

const ChatCard = (props) => {
  const { onPress, name, sender, msg_text } = props
  return (
    <TouchableOpacity onPress={onPress}>
      <Card
        containerStyle={{
          borderRadius: 5,
          elevation: 5,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Avatar.Icon
            size={45}
            icon='account'
            style={{ backgroundColor: "#E8E8E8" }}
          />

          {/* <UserAvatar size={100} name='Avishay Bar' borderRadius={32} /> */}

          <View
            style={{
              flexDirection: "column",
              width: "90%",
            }}
          >
            <Text style={{ marginLeft: 10, fontSize: 18, fontWeight: "bold" }}>
              {name}
            </Text>
            <Text numberOfLines={1} style={{ marginLeft: 10, width: "90%" }}>
              {sender} : {msg_text}
            </Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  )
}

export default ChatCard
