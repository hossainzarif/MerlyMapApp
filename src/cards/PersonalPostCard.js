import React from "react"
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native"
import { Card, ListItem, Button, Icon } from "react-native-elements"
const PersonalPostCard = (props) => {
  const { onPress, title, details } = props
  return (
    <TouchableOpacity onPress={onPress}>
      <Card
        containerStyle={{
          borderRadius: 10,
          elevation: 5,
        }}
      >
        <Card.Title>{title}</Card.Title>
        <Card.Divider />
        <Card.Image source={require("../../assets/map-1.png")}></Card.Image>
        <Card.Divider />

        <Text style={{ marginBottom: 10, textAlign: "justify" }}>
          {details}
        </Text>
      </Card>
    </TouchableOpacity>
  )
}

export default PersonalPostCard
