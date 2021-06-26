import React from "react"
import { TouchableOpacity } from "react-native"
import { View, Text, StyleSheet } from "react-native"
import { Card } from "react-native-elements"
import colors from "../../assets/data/colors"
const NoteCard = (props) => {
  const { name, email } = props
  return (
    <TouchableOpacity
      onPress={() => {
        console.log("AXED")
      }}
    >
      <Card containerStyle={{ borderRadius: 5, elevation: 5 }}>
        <Text style={styles.textdata}> Name: {name}</Text>
        <Text style={styles.textdata}> Email: {email}</Text>
        <Text numberOfLines={1} style={styles.textdata}>
          {" "}
          Messages: {email}
        </Text>
      </Card>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  textdata: {
    fontSize: 16,
    padding: 2,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.black,
  },
})
export default NoteCard
