import React, { useContext, useState, useEffect } from "react"
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native"
import { AuthContext } from "../Providers/AuthProvider"
import { FAB } from "react-native-paper"
import colors from "../../assets/data/colors"
import TextInputTaker from "../components/inputs/TextInputTaker"
import { ScrollView } from "react-native"
import CurvedButton from "../components/buttons/CurvedButton"
import { Entypo } from "@expo/vector-icons"
import {
  BUTTON_RADIUS,
  HEIGHT_BUTTON,
  ICON_SIZE,
} from "../constants/Height_Width"
import DateTimePickerModal from "react-native-modal-datetime-picker"
import DateCard from "../cards/DateCard"
import { SafeAreaView } from "react-native"
import DetailsInputTaker from "../components/inputs/DetailsInputTaker"
import moment from "moment"
import CalendarStrip from "react-native-calendar-strip"
import { ImageBrowser } from "expo-image-picker-multiple"
import * as ImagePicker from "expo-image-picker"
import ImageCard from "../cards/ImageCard"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import * as Location from "expo-location"
import config from "../../config"
import * as firebase from "firebase"
import Loading from "../custom/Loading"
import PostLoading from "../custom/PostLoading"
import { MaterialIcons } from "@expo/vector-icons"
import { Alert } from "react-native"
import { addPost } from "../Providers/FirebaseFunc"
const PostSalesScreen = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)

  const [selectedDates, setselectedDates] = useState(moment())
  const [dateTimearr, setdateTimearr] = useState([])
  const [images, setimages] = useState([])
  const [allLocation, setallLocation] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [LoadText, setLoadText] = useState("")
  const [DetailsText, setDetailsText] = useState("")
  const [titlePost, settitlePost] = useState("")

  const { user } = useContext(AuthContext)

  const showDatePicker = () => {
    setDatePickerVisibility(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const handleConfirm = (date) => {
    let dateTime =
      String(moment(selectedDates).format("LL")) +
      " " +
      String(moment(date).format("HH:MM"))

    setdateTimearr((dateTimearr) => [...dateTimearr, dateTime])

    console.log(dateTimearr)

    hideDatePicker()
  }
  useEffect(() => {
    ;(async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied")
        return
      }

      Location.installWebGeolocationPolyfill()
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!")
        }
      }
    })()
  }, [])
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      // aspect: [4, 5],
      quality: 0.7,
    })

    if (!result.cancelled) {
      setimages((images) => [...images, result.uri])
    }
  }

  const uploadImagePost = (pictures) => {
    setIsLoading(true)
    setLoadText("Uploading Image")
    const promises = pictures.map(async (file) => {
      const imgname = file.substring(file.lastIndexOf("/") + 1)
      const response = await fetch(file)
      const blob = await response.blob()

      const ref = firebase
        .storage()
        .ref()
        .child("images/postImages/" + imgname + "-" + String(moment()))

      return ref.put(blob).then(() => ref.getDownloadURL())
    })

    Promise.all(promises).then((fileDownloadUrls) => {
      setLoadText("Creating Post")

      addPost(
        allLocation,
        titlePost,
        dateTimearr,
        DetailsText,
        fileDownloadUrls,
        user.uid,
        setIsLoading,
        setdateTimearr,
        setallLocation,
        setimages
      )
    })
  }

  if (isLoading) {
    return <PostLoading loderText={LoadText} align='center' />
  } else {
    return (
      <SafeAreaView style={styles.container}>
        {/* <GooglePlacesAutocomplete
        placeholder='Search'
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details)
        }}
        query={{
          key: 'AIzaSyBBAxNJbe9wYcgUk8tN9VGzFEDMcXbaATU',
          language: 'en',
        }}
        currentLocation={true}
        currentLocationLabel='Current location'
        onFail={(error) => console.error(error)}
      /> */}

        <ScrollView
          contentContainerStyle={{ alignItems: "center" }}
          keyboardShouldPersistTaps={"handled"}
        >
          <View style={{ width: "90%", marginTop: 10, marginBottom: 10 }}>
            <Text style={styles.headerText}>Location *</Text>

            <GooglePlacesAutocomplete
              placeholder='Search'
              minLength={2} // minimum length of text to search
              autoFocus={false}
              returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
              listViewDisplayed='auto' // true/false/undefined
              fetchDetails={true}
              // renderDescription={(row) => row.description} // custom description render
              onPress={(data, details = null) => {
                console.log(JSON.stringify(details.geometry.location))

                setallLocation({
                  coords: {
                    latitude: details.geometry.location.lat,
                    longitude: details.geometry.location.lng,
                    address: details.formatted_address,
                  },
                })
              }}
              query={{
                // available options: https://developers.google.com/places/web-service/autocomplete
                key: config.MAP_API_KEY,
                language: "en", // language of the results
                components: "country:us",
              }}
              styles={{
                description: {
                  fontWeight: "bold",
                },

                predefinedPlacesDescription: {
                  color: colors.primary,
                },

                textInput: {
                  backgroundColor: colors.primary_fade,
                  borderColor: colors.primary,
                  height: 44,
                  borderRadius: 30,
                  paddingVertical: 5,
                  paddingHorizontal: 15,
                  fontSize: 15,
                  flex: 1,
                  borderColor: colors.primary,
                  borderWidth: 1,
                },
                poweredContainer: {
                  justifyContent: "flex-end",
                  alignItems: "center",
                  borderBottomRightRadius: 5,
                  borderBottomLeftRadius: 5,
                  borderColor: colors.primary,
                  borderTopWidth: 0.5,
                },
              }}
              currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
              currentLocationLabel='Current location'
              nearbyPlacesAPI='GoogleReverseGeocoding' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
              GooglePlacesSearchQuery={{
                // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                rankby: "distance",
              }}
              // filterReverseGeocodingByTypes={[
              //   "locality",
              //   "administrative_area_level_3",
              // ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
              enablePoweredByContainer={false}
              debounce={200}
              GooglePlacesDetailsQuery={{
                fields: ["geometry"],
              }}
              onFail={(error) => console.error(error)}
            />
          </View>
          <View style={{ width: "90%" }}>
            <Text style={styles.headerText}>Title *</Text>

            <TextInputTaker
              place='Title'
              onChangeText={function (currentInput) {
                settitlePost(currentInput)
              }}
            />
          </View>
          <View style={{ width: "90%", marginTop: 10, marginBottom: 10 }}>
            <Text style={styles.headerText}>Date & Time Range *</Text>

            <CalendarStrip
              style={{ height: 150, paddingTop: 20, paddingBottom: 10 }}
              calendarColor={"white"}
              calendarHeaderStyle={{ color: "black" }}
              dateNumberStyle={{ color: "black" }}
              dateNameStyle={{ color: "black" }}
              iconContainer={{ flex: 0.1 }}
              highlightDateNumberStyle={{
                color: "#fff",
                backgroundColor: colors.primary,
                marginTop: 10,
                height: 35,
                width: 35,
                textAlign: "center",
                borderRadius: 17.5,
                overflow: "hidden",
                paddingTop: 6,
                fontWeight: "400",
                justifyContent: "center",
                alignItems: "center",
              }}
              onDateSelected={(date) => {
                setselectedDates(date)
              }}
              highlightDateNameStyle={{ color: colors.primary }}
              disabledDateNameStyle={{ color: "red" }}
              disabledDateNumberStyle={{ color: "red", paddingTop: 10 }}
              selectedDate={selectedDates}
            />
            <TouchableOpacity style={styles.userBtn} onPress={showDatePicker}>
              <Entypo name='plus' size={24} color={colors.primary} />
              <Text style={styles.userBtnTxt}>Add day</Text>
            </TouchableOpacity>

            <FlatList
              data={dateTimearr}
              renderItem={({ item, index }) => (
                <DateCard
                  time={item}
                  showbutton={true}
                  onPress={() => {
                    setdateTimearr((dateTimearr) =>
                      dateTimearr.filter((_item, _Index) => _Index !== index)
                    )
                  }}
                />
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>

          <View style={{ width: "90%" }}>
            <Text style={styles.headerText}>Add Images (max 5)</Text>

            <TouchableOpacity style={styles.userBtn} onPress={pickImage}>
              <Entypo name='camera' size={24} color={colors.primary} />
              <Text style={styles.userBtnTxt}> Add Images</Text>
            </TouchableOpacity>

            <FlatList
              data={images}
              renderItem={({ item, index }) => (
                <ImageCard
                  uri={item}
                  onPress={() => {
                    setimages((images) =>
                      images.filter((_item, _Index) => _Index !== index)
                    )
                  }}
                />
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <View style={{ width: "90%", marginTop: 10, marginBottom: 10 }}>
            <Text style={styles.headerText}>Details *</Text>
            <DetailsInputTaker
              onChangeText={function (currentInput) {
                setDetailsText(currentInput)
              }}
            />
            <Text style={{ color: colors.warning }}>* marked are required</Text>
          </View>
          <View style={{ width: "90%", marginTop: 10, marginBottom: 10 }}>
            <CurvedButton
              btnText='Create Post'
              onPress={() => {
                if (allLocation == null) {
                  Alert.alert("Please pick valid location")
                } else if (titlePost && dateTimearr.length > 0 && DetailsText) {
                  if (images.length > 0) {
                    uploadImagePost(images)
                  } else {
                    setLoadText("Creating Post")
                    addPost(
                      allLocation,
                      titlePost,
                      dateTimearr,
                      DetailsText,
                      null,
                      user.uid,
                      setIsLoading,
                      setdateTimearr,
                      setallLocation,
                      setimages
                    )
                  }
                } else {
                  Alert.alert("Please fill up the required field")
                }
              }}
            />
          </View>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode='time'
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            locale='en_GB'
            is24Hour={true}
          />
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
    padding: 10,
    color: colors.darkGray,
  },
  userBtn: {
    flexDirection: "row",
    borderColor: colors.primary,
    borderWidth: 2,
    borderRadius: BUTTON_RADIUS,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  userBtnTxt: {
    color: colors.primary,
  },
})
export default PostSalesScreen
