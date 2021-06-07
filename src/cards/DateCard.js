import React from "react"
import { Text, TouchableOpacity } from "react-native"
import { Card } from "react-native-elements"
import colors from "../../assets/data/colors"
import { Entypo } from "@expo/vector-icons"
import { View } from "react-native"
const DateCard = (props) => {
  return (
    <Card
      containerStyle={{
        padding: 0,
        borderRadius: 30,
        height: 30,
        width: 220,
        justifyContent: "center",
        paddingLeft: 10,
        elevation: 3,
        marginBottom: 10,
      }}
    >
      <View
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          padding: 5,
        }}
      >
        <Text> {props.time} </Text>

        {props.showbutton ? (
          <TouchableOpacity onPress={props.onPress}>
            <Entypo name='cross' size={20} color={colors.warning} />
          </TouchableOpacity>
        ) : null}
      </View>
    </Card>
  )
}

export default DateCard
