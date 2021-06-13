import React, { useContext, useState, useEffect } from "react"
import { Text, View, StyleSheet, TextInput } from "react-native"
import { AuthContext } from "../Providers/AuthProvider"
import { FAB } from "react-native-paper"
import colors from "../../assets/data/colors"
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from "react-native-maps"
import * as Location from "expo-location"
import { Feather, Entypo } from "@expo/vector-icons"
import Loading from "../custom/Loading"
import { Alert } from "react-native"
import { ICON_SIZE, SearchBox_MAP_HEIGHT } from "../constants/Height_Width"

import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import { Input } from "react-native-elements"
import config from "../../config"
import PostLoading from "../custom/PostLoading"
import * as firebase from "firebase"

const MapScreen = ({ navigation }) => {
  const mapRef = React.createRef()

  const { user } = useContext(AuthContext)
  const [location, setLocation] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  const [loadingMap, setloadingMap] = useState(false)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    ;(async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied")
        return
      }
    })()
  }, [])

  const loadCoordinates = async () => {
    try {
      setloadingMap(true)
      let location = await Location.getCurrentPositionAsync({})
      setLocation(location)

      setloadingMap(false)
    } catch (error) {
      setloadingMap(true)
    }
  }

  const moveToPlace = (loc) => {
    if (loc) {
      setLocation({ coords: { latitude: loc.lat, longitude: loc.lng } })
    } else {
      Alert.alert("Please Turn on Location and try again")
    }
  }

  useEffect(() => {
    loadCoordinates()
    loadPosts()
  }, [])

  // const changeRegion = async () => {
  //   let locationnew = await Location.getCurrentPositionAsync({});

  //   setLocation(locationnew);

  //   const latitude = location.coords.latitude;
  //   const longitude = location.coords.longitude;

  //   console.log(location);
  // };

  const loadPosts = async () => {
    try {
      await firebase
        .firestore()
        .collection("posts")
        .onSnapshot((querySnapshot) => {
          let temp_posts = []
          querySnapshot.forEach((doc) => {
            temp_posts.push({
              id: doc.id,
              data: doc.data(),
            })
          })
          setPosts(temp_posts)
        })
    } catch (error) {
      Alert.alert(error)
    }
  }

  useEffect(() => {
    loadPosts()
  }, [])

  if (errorMsg) {
    Alert.alert("Please give access to Location.")
  } else if (location) {
    return (
      <View style={styles.container}>
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          zoomEnabled={true}
          loadingEnabled={true}
          loadingIndicatorColor={colors.primary}
          loadingBackgroundColor='#eeeeee'
          moveOnMarkerPress={false}
          showsUserLocation={true}
          showsCompass={false}
          showsPointsOfInterest={false}
          showsMyLocationButton={false}
          style={styles.mapStyle}
          region={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            icon={<Entypo name='location-pin' size={24} color='black' />}
          ></Marker>

          {posts.map((pos) => (
            <Marker
              key={pos.id}
              coordinate={{
                latitude: pos.data.location.coords.latitude,
                longitude: pos.data.location.coords.longitude,
              }}
              image={require("../../assets/marker.png")}
            >
              <Callout
                tooltip
                onPress={() => {
                  navigation.navigate("Details", {
                    address: pos.data.location.coords.address,
                    images: pos.data.pictures,
                    details: pos.data.details,
                    dates: pos.data.dates,
                  })
                }}
              >
                <View>
                  <View style={styles.bubble}>
                    <View style={{ alignItems: "center" }}>
                      <Entypo
                        name='location-pin'
                        size={25}
                        color={colors.primary}
                      />
                    </View>
                    <Text numberOfLines={1} style={styles.name}>
                      {pos.data.title}
                    </Text>

                    <Text style={{ fontSize: 13 }} numberOfLines={1}>
                      {pos.data.details}
                    </Text>
                    <Text style={{ fontSize: 10 }}>click for more details</Text>
                  </View>
                  <View style={styles.arrowBorder} />
                  <View style={styles.arrow} />
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>

        <FAB
          style={styles.fab_loc}
          small
          icon='map-marker'
          onPress={() => loadCoordinates()}
          color={colors.white}
        />

        <FAB
          style={styles.fab}
          large
          icon='plus'
          onPress={() => navigation.navigate("PostSales")}
          color={colors.white}
        />
        <View style={styles.searchBox}>
          <GooglePlacesAutocomplete
            placeholder='Search'
            minLength={2} // minimum length of text to search
            autoFocus={false}
            enablePoweredByContainer={false}
            fetchDetails={true}
            GooglePlacesDetailsQuery={{
              fields: ["geometry"],
            }}
            query={{
              key: config.MAP_API_KEY,
              language: "en", // language of the results
              components: "country:us",
            }}
            styles={{
              description: {
                fontWeight: "bold",
              },

              textInput: {
                height: 40,
              },
            }}
            renderLeftButton={() => (
              <Feather
                name='search'
                size={ICON_SIZE}
                color='black'
                style={{ alignSelf: "center", paddingBottom: 5 }}
              />
            )}
            onPress={(data, details) => {
              if (details.geometry.location) {
                moveToPlace(details.geometry.location)
              } else {
                Alert.alert("This Specific location was not found")
              }
            }}
          />
        </View>
      </View>
    )
  } else {
    return (
      <PostLoading
        loderText='Checking for location, please check if your location is enabled'
        align='justify'
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  fab_loc: {
    position: "absolute",
    margin: 16,
    right: 10,
    bottom: 100,
    backgroundColor: colors.primary,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 20,
    backgroundColor: colors.primary,
  },
  mapStyle: {
    flex: 1,
  },
  searchBox: {
    position: "absolute",
    marginTop: Platform.OS === "ios" ? 40 : 10,
    flexDirection: "row",
    backgroundColor: "#fff",
    width: "90%",
    alignSelf: "center",
    borderRadius: 5,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  bubble: {
    flexDirection: "column",
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 6,
    borderColor: "#ccc",
    borderWidth: 0.5,
    padding: 15,
    width: 150,
  },
  // Arrow below the bubble
  arrow: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#fff",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -40,
  },
  arrowBorder: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#007a87",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -0.5,
    // marginBottom: -15
  },
  // Character name
  name: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
  },
})
export default MapScreen
