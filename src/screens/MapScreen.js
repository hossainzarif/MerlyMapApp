import React, { useContext, useState, useEffect } from "react"
import { Text, View, StyleSheet, TextInput } from "react-native"
import { AuthContext } from "../Providers/AuthProvider"
import { FAB } from "react-native-paper"
import colors from "../../assets/data/colors"
import MapView, { PROVIDER_GOOGLE } from "react-native-maps"
import * as Location from "expo-location"
import { Feather } from "@expo/vector-icons"
import Loading from "../custom/Loading"
import { Alert } from "react-native"
import { ICON_SIZE, SearchBox_MAP_HEIGHT } from "../constants/Height_Width"

import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import { Input } from "react-native-elements"
import config from "../../config"

const MapScreen = ({ navigation }) => {
  const mapRef = React.createRef()

  const { user } = useContext(AuthContext)
  const [location, setLocation] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  const [loadingMap, setloadingMap] = useState(false)
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
  }, [])

  // const changeRegion = async () => {
  //   let locationnew = await Location.getCurrentPositionAsync({});

  //   setLocation(locationnew);

  //   const latitude = location.coords.latitude;
  //   const longitude = location.coords.longitude;

  //   console.log(location);
  // };

  if (errorMsg) {
    Alert.alert("Please Turn on Location.")
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
        ></MapView>

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
    return <Loading />
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
})
export default MapScreen
