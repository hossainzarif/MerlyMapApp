import React from "react"
import { View, Text } from "react-native"
import { Card, ListItem } from "react-native-elements"
import { Avatar } from "react-native-paper"
import colors from "../../assets/data/colors"
import UserAvatar from "react-native-user-avatar"
import { TouchableOpacity } from "react-native"

const ChatCard = (props) => {
  const { onPress, name } = props
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
            size={40}
            icon='account'
            style={{ backgroundColor: "#E8E8E8" }}
          />

          {/* <UserAvatar size={100} name='Avishay Bar' borderRadius={32} /> */}

          <Text style={{ marginLeft: 10 }}>{name}</Text>
        </View>
      </Card>
    </TouchableOpacity>
  )
}

export default ChatCard
