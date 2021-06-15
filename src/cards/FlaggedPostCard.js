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

const FlaggedPostCard = (props) => {
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

export default FlaggedPostCard
