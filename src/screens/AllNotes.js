import React, { useContext, useState } from "react"
import {
  View,
  ScrollView,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Switch,
} from "react-native"
import colors from "../../assets/data/colors"
import { Card, ListItem, Button, Icon } from "react-native-elements"

const AllNotes = ({ route, navigation }) => {
  const { name, email, messages } = route.params

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        <View style={styles.sections}>
          <Text style={styles.headerText}>Name</Text>

          <Card containerStyle={styles.cardStyle}>
            <Text style={styles.locationText}>{name}</Text>
          </Card>
        </View>
        <View style={styles.sections}>
          <Text style={styles.headerText}>Email</Text>

          <Card containerStyle={styles.cardStyle}>
            <Text style={styles.locationText}>{email}</Text>
          </Card>
        </View>
        <View style={styles.sections}>
          <Text style={styles.headerText}>Message</Text>

          <Card containerStyle={styles.cardStyle}>
            <Text style={styles.locationText}>{messages}</Text>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.darkGray,
  },

  userBtnTxt: {
    color: colors.primary,
  },
  locationText: { textAlign: "justify", fontSize: 15 },
  cardStyle: {
    borderRadius: 10,
    elevation: 2,
    marginBottom: 5,
  },
  sections: {
    width: "90%",
    marginTop: 10,
    marginBottom: 10,
  },
  fab: {
    backgroundColor: colors.primary,
  },
  fab_2: {
    backgroundColor: colors.flag,
  },
  checkedText: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.darkGray,
  },
})

export default AllNotes
