import React from "react"
import {
  View,
  ScrollView,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
} from "react-native"
import colors from "../../assets/data/colors"
import { Card, ListItem, Button, Icon } from "react-native-elements"
import DateCard from "../cards/DateCard"
const PostDetails = ({ route }) => {
  const { address, dates } = route.params
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        <View style={{ width: "90%", marginTop: 10, marginBottom: 10 }}>
          <Text style={styles.headerText}>Location</Text>
          <Card
            containerStyle={{
              borderRadius: 10,
              elevation: 5,
            }}
          >
            <Text style={styles.locationText}>{address}</Text>
          </Card>
        </View>
        <View style={{ width: "90%", marginTop: 10, marginBottom: 10 }}>
          <Text style={styles.headerText}>Dates</Text>

          <FlatList
            data={dates}
            renderItem={({ item, index }) => (
              <DateCard time={item} showbutton={false} />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
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
})

export default PostDetails
