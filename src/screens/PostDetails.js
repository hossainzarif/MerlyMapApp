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
import { SliderBox } from "react-native-image-slider-box"
import { Colors } from "react-native/Libraries/NewAppScreen"

const PostDetails = ({ route }) => {
  const { address, dates, details, images } = route.params
  const imagesArr = [
    "https://s-media-cache-ak0.pinimg.com/originals/ee/51/39/ee5139157407967591081ee04723259a.png",
    "https://s-media-cache-ak0.pinimg.com/originals/40/4f/83/404f83e93175630e77bc29b3fe727cbe.jpg",
    "https://s-media-cache-ak0.pinimg.com/originals/8d/1a/da/8d1adab145a2d606c85e339873b9bb0e.jpg",
  ]
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        <View style={styles.sections}>
          <Text style={styles.headerText}>Location</Text>
          <Card containerStyle={styles.cardStyle}>
            <Text style={styles.locationText}>{address}</Text>
          </Card>
        </View>
        <View style={styles.sections}>
          <Text style={styles.headerText}>Dates</Text>

          <FlatList
            data={dates}
            renderItem={({ item }) => (
              <DateCard time={item} showbutton={false} />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View style={styles.sections}>
          <Text style={styles.headerText}>Photos</Text>

          {images ? (
            <View style={{ width: "100%", backgroundColor: "white" }}>
              <SliderBox
                images={images}
                dotColor={colors.primary}
                paginationBoxVerticalPadding={20}
                circleLoop
                resizeMethod={"resize"}
                resizeMode={"contain"}
                paginationBoxStyle={{
                  alignItems: "center",
                  alignSelf: "center",
                  justifyContent: "center",
                }}
                ImageComponentStyle={{
                  borderRadius: 15,
                  backgroundColor: "white",
                }}
                imageLoadingColor={colors.primary}
              />
            </View>
          ) : (
            <Card containerStyle={styles.cardStyle}>
              <Card.Image
                source={require("../../assets/unav.png")}
                style={{ resizeMode: "contain" }}
              ></Card.Image>
            </Card>
          )}
        </View>
        <View style={styles.sections}>
          <Text style={styles.headerText}>Details</Text>
          <Card containerStyle={styles.cardStyle}>
            <Text style={styles.locationText}>{details}</Text>
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
    elevation: 5,
  },
  sections: {
    width: "90%",
    marginTop: 10,
    marginBottom: 10,
  },
})

export default PostDetails
