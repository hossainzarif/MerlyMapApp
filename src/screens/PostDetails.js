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
import DateCard from "../cards/DateCard"
import { SliderBox } from "react-native-image-slider-box"
import { Colors } from "react-native/Libraries/NewAppScreen"
import { FAB } from "react-native-paper"
import { AuthContext } from "../Providers/AuthProvider"
import { TouchableOpacity } from "react-native-gesture-handler"
import openMap from "react-native-open-maps"
import OpenMap from "react-native-open-map"
import { FlagPost, updateAvailability } from "../Providers/FirebaseFunc"
import Loading from "../custom/Loading"
import { RadioButton } from "react-native-paper"
import { color } from "react-native-elements/dist/helpers"

const PostDetails = ({ route, navigation }) => {
  const {
    address,
    dates,
    details,
    images,
    user_id,
    name,
    coord,
    post_id,
    available,
  } = route.params
  const { user } = useContext(AuthContext)

  const [flagLoading, setflagLoading] = useState(false)
  // function _goToYosemite() {}
  const [isEnabled, setIsEnabled] = useState(available)
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState)

    if (isEnabled) {
      updateAvailability(post_id, false)
    } else {
      updateAvailability(post_id, true)
    }
  }
  if (flagLoading) {
    return <Loading />
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={{ alignItems: "center" }}>
          {user_id != user.uid ? (
            <View
              style={{
                justifyContent: "flex-end",
                alignItems: "center",
                // backgroundColor: "red",
                width: "90%",
                marginTop: 10,
                flexDirection: "row",
              }}
            >
              <Text style={styles.checkedText}>Checked In </Text>
              <Switch
                trackColor={{ false: colors.darkGray, true: colors.primary }}
                thumbColor={isEnabled ? colors.darkGray : colors.primary}
                ios_backgroundColor='#3e3e3e'
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
          ) : (
            <View
              style={{
                justifyContent: "flex-end",
                alignItems: "center",
                // backgroundColor: "red",
                width: "90%",
                marginTop: 10,
                flexDirection: "row",
              }}
            >
              <Text style={styles.checkedText}>Sale available </Text>
              <Switch
                trackColor={{ false: colors.darkGray, true: colors.primary }}
                thumbColor={isEnabled ? colors.darkGray : colors.primary}
                ios_backgroundColor='#3e3e3e'
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
          )}
          <View style={styles.sections}>
            <Text style={styles.headerText}>
              Location (tap to open in maps)
            </Text>
            <TouchableOpacity
              onPress={() => {
                OpenMap.show({
                  latitude: coord.latitude,
                  longitude: coord.longitude,
                })
              }}
            >
              <Card containerStyle={styles.cardStyle}>
                <Text style={styles.locationText}>{address}</Text>
              </Card>
            </TouchableOpacity>
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
            <Text style={[styles.headerText, { marginBottom: 10 }]}>
              Photos
            </Text>

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
                justifyContent: "space-between",
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

              <Text style={{ paddingLeft: 10 }}>Message sller</Text>

              <FAB
                style={styles.fab_2}
                large
                icon='alert'
                color={colors.white}
                onPress={() => {
                  FlagPost(post_id, user_id, setflagLoading, user.uid)
                }}
              />
              <Text style={{ paddingLeft: 10 }}>Flag the post</Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    )
  }
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

export default PostDetails
