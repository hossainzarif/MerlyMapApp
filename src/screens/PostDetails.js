import React, { useContext } from "react"
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
import { FAB } from "react-native-paper"
import { AuthContext } from "../Providers/AuthProvider"
import { TouchableOpacity } from "react-native-gesture-handler"

const PostDetails = ({ route, navigation }) => {
  const { address, dates, details, images, user_id, name } = route.params
  const { user } = useContext(AuthContext)

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
          <Text style={[styles.headerText, { marginBottom: 10 }]}>Photos</Text>

          {images ? (
            <SliderBox
              images={images}
              dotColor={colors.primary}
              paginationBoxVerticalPadding={10}
              circleLoop
              resizeMethod={"resize"}
              resizeMode={"contain"}
              paginationBoxStyle={{
                alignItems: "center",
                alignSelf: "center",
                justifyContent: "center",
                paddingVertical: 10,
              }}
              ImageComponentStyle={{
                borderRadius: 15,
                backgroundColor: "white",
                alignSelf: "center",
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 10,
                marginRight: 30,
              }}
              imageLoadingColor={colors.primary}
            />
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

        {user_id == user.uid ? null : (
          <View
            style={{
              justifyContent: "flex-start",
              alignItems: "center",
              width: "85%",
              paddingBottom: 20,
              paddingTop: 10,
              flexDirection: "row",
            }}
          >
            <FAB
              style={styles.fab}
              large
              icon='message'
              color={colors.white}
              onPress={() => {
                navigation.navigate("Chat", {
                  seller_name: name,
                })
              }}
            />

            <Text style={{ paddingLeft: 10 }}>Message seller</Text>
          </View>
        )}
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
  },
  sections: {
    width: "90%",
    marginTop: 10,
    marginBottom: 10,
  },
  fab: {
    backgroundColor: colors.primary,
  },
})

export default PostDetails
