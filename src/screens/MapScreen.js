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
import { SearchBox_MAP_HEIGHT } from "../constants/Height_Width"

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

      console.log(location)
    } catch (error) {
      setloadingMap(true)
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
    Alert.alert("OK")
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
          <Feather
            name='search'
            size={SearchBox_MAP_HEIGHT}
            color={colors.darkGray}
            style={{ paddingRight: 5 }}
          />

          <TextInput
            placeholder='Search here'
            placeholderTextColor='#000'
            autoCapitalize='none'
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
    marginTop: Platform.OS === "ios" ? 40 : 20,
    flexDirection: "row",
    backgroundColor: "#fff",
    width: "90%",
    alignSelf: "center",
    borderRadius: 5,
    padding: 10,
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
