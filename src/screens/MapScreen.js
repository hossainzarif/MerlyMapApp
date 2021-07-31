import React, { useContext, useState, useEffect } from 'react'
import { Text, View, StyleSheet, TextInput } from 'react-native'
import { AuthContext } from '../Providers/AuthProvider'
import { FAB } from 'react-native-paper'
import colors from '../../assets/data/colors'
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps'
import * as Location from 'expo-location'
import { Feather, Entypo } from '@expo/vector-icons'
import Loading from '../custom/Loading'
import { Alert } from 'react-native'
import { ICON_SIZE, SearchBox_MAP_HEIGHT } from '../constants/Height_Width'
import moment from 'moment'

import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from 'expo-ads-admob'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import config from '../../config'
import PostLoading from '../custom/PostLoading'
import * as firebase from 'firebase'
import { FontAwesome5 } from '@expo/vector-icons'
import { LogBox } from 'react-native'

const MapScreen = ({ navigation }) => {
  const mapRef = React.createRef()

  const { user } = useContext(AuthContext)
  const [location, setLocation] = useState({
    coords: { latitude: 23.93, longitude: 93.2 },
  })
  const [errorMsg, setErrorMsg] = useState(null)
  const [loadingMap, setloadingMap] = useState(false)
  const [posts, setPosts] = useState([])
  const [ad, setad] = useState(false)

  // const [markers, setmarkers] = useState(null)
  const markers = []
  useEffect(() => {
    ;(async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied')
        return
      }
    })()
  }, [])

  const loadCoordinates_initial = async () => {
    try {
      setloadingMap(true)
      let location = await Location.getCurrentPositionAsync({})
      setLocation(location)
      // Adafter5()
    } catch (error) {
      Alert.alert('Error:', error.message)
    }
  }
  const loadCoordinates = async () => {
    try {
      setloadingMap(true)
      let location = await Location.getCurrentPositionAsync({})
      setLocation(location)
      Adafter5()
    } catch (error) {
      Alert.alert('Error:', error.message)
    }
  }
  const moveToPlace = (loc) => {
    if (loc) {
      setLocation({ coords: { latitude: loc.lat, longitude: loc.lng } })
    } else {
      Alert.alert('Please Turn on Location and try again')
    }
  }

  useEffect(() => {
    loadCoordinates_initial()
    loadPosts()
    // Adafter10()
  }, [])

  const loadAd = async () => {
    await AdMobInterstitial.setAdUnitID(
      'ca-app-pub-3940256099942544/1033173712'
    ) // Test ID, Replace with your-admob-unit-id
    await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: false })
    ShowAd()
  }

  const ShowAd = async () => {
    await AdMobInterstitial.showAdAsync()
  }

  const Adafter5 = () => {
    setTimeout(() => {
      loadAd()
    }, 10000)
  }

  const loadPosts = async () => {
    try {
      await firebase
        .firestore()
        .collection('posts')
        .where('expiary', '>=', String(moment().format('YYYY-MM-DD')))
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
      Alert.alert('Error:', error.message)
    }
  }

  if (errorMsg) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 15 }}>
          Permission was denied please give permission
        </Text>
      </View>
    )
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
          {posts.map((pos) => (
            <Marker
              tracksViewChanges={false}
              key={pos.id}
              ref={(ref) => (markers[pos.id] = ref)}
              coordinate={{
                latitude: pos.data.location.coords.latitude,
                longitude: pos.data.location.coords.longitude,
              }}
              image={require('../../assets/sell.png')}
            >
              <Callout
                tooltip
                onPress={() => {
                  markers[pos.id].hideCallout()
                  navigation.navigate('Details', {
                    address: pos.data.location.coords.address,
                    images: pos.data.pictures,
                    details: pos.data.details,
                    dates: pos.data.dates,
                    user_id: pos.data.user,
                    name: pos.data.user_name,
                    coord: pos.data.location.coords,
                    post_id: pos.id,
                  })
                }}
              >
                <View>
                  <View style={styles.bubble}>
                    <Text numberOfLines={1} style={styles.name}>
                      {pos.data.title}
                    </Text>

                    {/* <Text style={{ fontSize: 13 }} numberOfLines={1}>
                      {pos.data.details}
                    </Text> */}
                    <Text style={{ fontSize: 10 }}>click for more details</Text>
                  </View>
                  <View style={styles.arrowBorder} />
                  <View style={styles.arrow} />
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>

        <AdMobBanner
          bannerSize='fullBanner'
          adUnitID='ca-app-pub-3940256099942544/6300978111' // Test ID, Replace with your-admob-unit-id
          servePersonalizedAds={false} // true or false
          // onDidFailToReceiveAdWithError={this.bannerError}
        />

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
          onPress={() => navigation.navigate('PostSales')}
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
              fields: ['geometry'],
            }}
            query={{
              key: config.MAP_API_KEY,
              language: 'en', // language of the results
              components: 'country:us',
            }}
            styles={{
              description: {
                fontWeight: 'bold',
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
                style={{ alignSelf: 'center', paddingBottom: 5 }}
              />
            )}
            onPress={(data, details) => {
              if (details.geometry.location) {
                moveToPlace(details.geometry.location)
              } else {
                Alert.alert('This Specific location was not found')
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
    position: 'absolute',
    margin: 16,
    right: 10,
    bottom: 100,
    backgroundColor: colors.primary,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 20,
    backgroundColor: colors.primary,
  },
  mapStyle: {
    flex: 1,
  },
  searchBox: {
    position: 'absolute',
    marginTop: Platform.OS === 'ios' ? 40 : 10,
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 5,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  bubble: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 0.5,
    padding: 15,
    width: 150,
  },
  // Arrow below the bubble
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -40,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5,
    // marginBottom: -15
  },
  // Character name
  name: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  avStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
})
export default MapScreen
