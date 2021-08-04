import React, { useContext, useState, useEffect } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native'
import { AuthContext } from '../Providers/AuthProvider'
import { FAB } from 'react-native-paper'
import colors from '../../assets/data/colors'
import TextInputTaker from '../components/inputs/TextInputTaker'
import { ScrollView } from 'react-native'
import CurvedButton from '../components/buttons/CurvedButton'
import { Entypo } from '@expo/vector-icons'
import {
  BUTTON_RADIUS,
  HEIGHT_BUTTON,
  ICON_SIZE,
} from '../constants/Height_Width'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import DateCard from '../cards/DateCard'
import { SafeAreaView } from 'react-native'
import DetailsInputTaker from '../components/inputs/DetailsInputTaker'
import moment from 'moment'
import CalendarStrip from 'react-native-calendar-strip'
import { ImageBrowser } from 'expo-image-picker-multiple'
import * as ImagePicker from 'expo-image-picker'
import ImageCard from '../cards/ImageCard'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import * as Location from 'expo-location'
import config from '../../config'
import * as firebase from 'firebase'
import Loading from '../custom/Loading'
import PostLoading from '../custom/PostLoading'
import { MaterialIcons } from '@expo/vector-icons'
import { Alert } from 'react-native'
import { addPost } from '../Providers/FirebaseFunc'
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from 'expo-ads-admob'
import * as Animatable from 'react-native-animatable'

const EditPostScreen = ({ route }) => {
  const {
    address,
    dates,
    title,
    name,
    details,
    images_passed,
    user_id,
    post_id,
    available,
  } = route.params
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  const [isDatePickerVisible_1, setDatePickerVisibility_1] = useState(false)

  const [selectedDates, setselectedDates] = useState(moment())
  const [dateTimearr, setdateTimearr] = useState(dates)
  const [images, setimages] = useState(images_passed)
  const [allLocation, setallLocation] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [LoadText, setLoadText] = useState('')
  const [DetailsText, setDetailsText] = useState(details)
  const [titlePost, settitlePost] = useState(title)
  const [firstDate, setfirstDate] = useState('')
  const { user } = useContext(AuthContext)
  const expiarydate = String(moment().add(7, 'days').format('YYYY-MM-DD'))
  const fadeIn = {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  }
  const showDatePicker = () => {
    setDatePickerVisibility(true)
  }

  const showDatePicker_1 = () => {
    setDatePickerVisibility_1(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }
  const hideDatePicker_1 = () => {
    setDatePickerVisibility_1(false)
  }
  const handleConfirm = (date) => {
    let dateTime =
      String(moment(selectedDates).format('LL')) +
      ' ' +
      String(moment(date).format('hh:mm A'))

    setfirstDate(dateTime)
    showDatePicker_1()
    hideDatePicker()
  }

  const handleConfirm_1 = (date) => {
    let dateTime =
      firstDate +
      ' ' +
      'to' +
      ' ' +
      String(moment(date).format('hh:mm A')) +
      '  '

    if (
      new Date(String(moment(firstDate).format('YYYY-MM-DD'))).getTime() <
      new Date(String(moment().format('YYYY-MM-DD'))).getTime()
    ) {
      Alert.alert('Previous days are not acceptable')
    } else if (
      new Date(String(moment().add(7, 'days').format('YYYY-MM-DD'))).getTime() <
      new Date(String(moment(firstDate).format('YYYY-MM-DD'))).getTime()
    ) {
      Alert.alert('Date range should be in a week')
    } else {
      if (dateTimearr.length <= 6) {
        setdateTimearr((dateTimearr) => [...dateTimearr, dateTime])
      } else {
        Alert.alert('Max days selected already')
      }
    }

    hideDatePicker_1()
  }

  useEffect(() => {
    ;(async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied')
        return
      }

      Location.installWebGeolocationPolyfill()
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
      if (status !== 'granted') {
        return
      }
    })()
  }, [])
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // aspect: [4, 5],
      quality: 0.7,
    })

    if (!result.cancelled) {
      if (images.length <= 19) {
        setimages((images) => [...images, result.uri])
      } else {
        Alert.alert('Max images selected already')
      }
    }
  }
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
  const Adafter10 = () => {
    setTimeout(() => {
      loadAd()
    }, 15000)
  }
  const Adafter5 = () => {
    setTimeout(() => {
      loadAd()
    }, 5000)
  }

  const uploadImagePost = (pictures) => {
    setIsLoading(true)
    setLoadText('Uploading Image')
    const promises = pictures.map(async (file) => {
      const imgname = file.substring(file.lastIndexOf('/') + 1)
      const response = await fetch(file)
      const blob = await response.blob()

      const ref = firebase
        .storage()
        .ref()
        .child('images/postImages/' + imgname + '-' + String(moment()))

      return ref.put(blob).then(() => ref.getDownloadURL())
    })

    Promise.all(promises).then((fileDownloadUrls) => {
      setLoadText('Creating Post')

      addPost(
        allLocation,
        titlePost,
        dateTimearr,
        DetailsText,
        fileDownloadUrls,
        user.uid,
        user.displayName,
        setIsLoading,
        setdateTimearr,
        setallLocation,
        setimages,
        user.email,
        expiarydate
      )
    })
    Adafter10()
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
          contentContainerStyle={{ alignItems: 'center' }}
          keyboardShouldPersistTaps={'handled'}
        >
          <View style={{ width: '90%', marginTop: 10, marginBottom: 10 }}>
            <Text style={styles.headerText}>Location *</Text>

            <GooglePlacesAutocomplete
              placeholder={address}
              minLength={2} // minimum length of text to search
              autoFocus={false}
              returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
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
                language: 'en', // language of the results
                components: 'country:us',
              }}
              styles={{
                description: {
                  fontWeight: 'bold',
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
                  justifyContent: 'flex-end',
                  alignItems: 'center',
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
                rankby: 'distance',
              }}
              // filterReverseGeocodingByTypes={[
              //   "locality",
              //   "administrative_area_level_3",
              // ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
              enablePoweredByContainer={false}
              debounce={200}
              GooglePlacesDetailsQuery={{
                fields: ['geometry'],
              }}
              onFail={(error) => console.error(error)}
            />
          </View>
          <View style={{ width: '90%' }}>
            <Text style={styles.headerText}>Title *</Text>

            <TextInputTaker
              place='title'
              val={titlePost}
              len={80}
              onChangeText={function (currentInput) {
                settitlePost(currentInput)
              }}
            />
          </View>
          <View style={{ width: '90%', marginTop: 10, marginBottom: 10 }}>
            <Text style={styles.headerText}>Date & Time Range *</Text>

            <CalendarStrip
              style={{ height: 150, paddingTop: 20, paddingBottom: 10 }}
              calendarColor={'white'}
              calendarHeaderStyle={{ color: 'black' }}
              dateNumberStyle={{ color: 'black' }}
              dateNameStyle={{ color: 'black' }}
              iconContainer={{ flex: 0.1 }}
              highlightDateNumberStyle={{
                color: '#fff',
                backgroundColor: colors.primary,
                marginTop: 10,
                height: 35,
                width: 35,
                textAlign: 'center',
                borderRadius: 17.5,
                overflow: 'hidden',
                paddingTop: 6,
                fontWeight: '400',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onDateSelected={(date) => {
                setselectedDates(date)
              }}
              highlightDateNameStyle={{ color: colors.primary }}
              disabledDateNameStyle={{ color: 'red' }}
              disabledDateNumberStyle={{ color: 'red', paddingTop: 10 }}
              selectedDate={selectedDates}
            />
            <TouchableOpacity style={styles.userBtn} onPress={showDatePicker}>
              <Entypo name='plus' size={24} color={colors.primary} />
              <Text style={styles.userBtnTxt}>Add time</Text>
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
              showsHorizontalScrollIndicator={false}
            />
          </View>

          <View style={{ width: '90%' }}>
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
            {images.length > 2 ? (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: 5,
                }}
              >
                <Animatable.Text
                  animation={fadeIn}
                  duration={2000}
                  easing='ease-out'
                  iterationCount='infinite'
                  style={{ textAlign: 'center' }}
                >
                  Swipe Left
                </Animatable.Text>
              </View>
            ) : null}
          </View>
          <View style={{ width: '90%', marginTop: 10, marginBottom: 10 }}>
            <Text style={styles.headerText}>Details *</Text>
            <DetailsInputTaker
              len={2000}
              val={DetailsText}
              onChangeText={function (currentInput) {
                setDetailsText(currentInput)
              }}
            />
            <Text style={{ color: colors.warning }}>* marked are required</Text>
          </View>
          <View style={{ width: '90%', marginTop: 10, marginBottom: 10 }}>
            <CurvedButton
              btnText='Confirm Edit'
              onPress={() => {
                // if (allLocation == null) {
                //   Alert.alert('Please pick valid location')
                // } else if (titlePost && dateTimearr.length > 0 && DetailsText) {
                //   if (images.length > 0) {
                //     uploadImagePost(images)
                //   } else {
                //     setLoadText('Creating Post')
                //     addPost(
                //       allLocation,
                //       titlePost,
                //       dateTimearr,
                //       DetailsText,
                //       null,
                //       user.uid,
                //       user.displayName,
                //       setIsLoading,
                //       setdateTimearr,
                //       setallLocation,
                //       setimages,
                //       user.email,
                //       expiarydate
                //     )
                //     Adafter5()
                //   }
                // } else {
                //   Alert.alert('Please fill up the required field')
                // }
                console.log(images)
              }}
            />
          </View>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode='time'
            timePickerModeAndroid='spinner'
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            mode='time'
            display='spinner'
          />
          <DateTimePickerModal
            isVisible={isDatePickerVisible_1}
            mode='time'
            timePickerModeAndroid='spinner'
            onConfirm={handleConfirm_1}
            onCancel={hideDatePicker_1}
            mode='time'
            display='spinner'
          />
        </ScrollView>
      </SafeAreaView>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    color: colors.darkGray,
  },
  userBtn: {
    flexDirection: 'row',
    borderColor: colors.primary,
    borderWidth: 2,
    borderRadius: BUTTON_RADIUS,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  userBtnTxt: {
    color: colors.primary,
  },
})
export default EditPostScreen
