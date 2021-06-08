import React from "react"
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
} from "react-native"
import { Entypo } from "@expo/vector-icons"
import { Card, ListItem, Button, Icon } from "react-native-elements"
import colors from "../../assets/data/colors"
const PersonalPostCard = (props) => {
  const { onPress, title, details, img, onPress_delete } = props

  return (
    <Card
      containerStyle={{
        borderRadius: 10,
        elevation: 5,
      }}
    >
      <View style={styles.title}>
        <Text style={styles.titleText}>{title}</Text>

        <TouchableOpacity onPress={onPress_delete}>
          <Entypo name='cross' size={30} color={colors.warning} />
        </TouchableOpacity>
      </View>

      <Card.Divider />
      <TouchableOpacity onPress={onPress}>
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
      </TouchableOpacity>
    </Card>
  )
}
const styles = StyleSheet.create({
  imgStyle: {
    resizeMode: "contain",
    marginBottom: 10,
  },
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  titleText: { textAlign: "justify", width: "90%", fontSize: 18 },
})

export default PersonalPostCard
