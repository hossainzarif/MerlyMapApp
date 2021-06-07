import React from "react"
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
} from "react-native"
import { Card, ListItem, Button, Icon } from "react-native-elements"
const PersonalPostCard = (props) => {
  const { onPress, title, details, img } = props

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

        {img ? (
          <Card.Image
            style={styles.imgStyle}
            source={{ uri: img[0] }}
          ></Card.Image>
        ) : (
          <Card.Image
            source={require("../../assets/unav.png")}
            style={styles.imgStyle}
          ></Card.Image>
        )}

        <Card.Divider />

        <Text style={{ marginBottom: 10, textAlign: "justify" }}>
          {details}
        </Text>
      </Card>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  imgStyle: {
    resizeMode: "contain",
  },
})

export default PersonalPostCard
