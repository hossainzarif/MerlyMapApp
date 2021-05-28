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
import { BUTTON_RADIUS, HEIGHT_BUTTON } from '../constants/Height_Width'
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

const PostSalesScreen = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  const [dateTimeArray, setdateTimeArray] = useState([])
  const [firstDate, setFirstDate] = useState('')

  const [selectedDates, setselectedDates] = useState(moment())
  const [dateTimearr, setdateTimearr] = useState([])
  const [images, setimages] = useState([])
  const [image, setImage] = useState(null)

  const showDatePicker = () => {
    setDatePickerVisibility(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const handleConfirm = (date) => {
    let dateTime =
      String(moment(selectedDates).format('LL')) +
      ' ' +
      String(moment(date).format('HH:MM'))

    setdateTimearr((dateTimearr) => [...dateTimearr, dateTime])

    console.log(dateTimearr)

    hideDatePicker()
  }

  useEffect(() => {
    ;(async () => {
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!')
        }
      }
    })()
  }, [])
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 5],
      quality: 0.7,
    })

    console.log(result)

    if (!result.cancelled) {
      setImage(result.uri)
      setimages((images) => [...images, result.uri])
      console.log(image)
    }
  }

  const homePlace = {
    description: 'Home',
    geometry: { location: { lat: 48.8152937, lng: 2.4597668 } },
  }
  const workPlace = {
    description: 'Work',
    geometry: { location: { lat: 48.8496818, lng: 2.2940881 } },
  }

  return (
    <SafeAreaView style={styles.container}>
      <GooglePlacesAutocomplete
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
      />
      {/* <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
        <View style={{ width: '90%', marginTop: 10, marginBottom: 10 }}>
          <Text style={styles.headerText}>Location</Text>

          <Text style={styles.headerText}>Or</Text>

          <TouchableOpacity style={styles.userBtn}>
            <Entypo name='location-pin' size={24} color={colors.primary} />
            <Text style={styles.userBtnTxt}>Use Current Location</Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: '90%', marginTop: 10, marginBottom: 10 }}>
          <Text style={styles.headerText}>Date & Time Range (Optional)</Text>

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
            <Text style={styles.userBtnTxt}>Add day</Text>
          </TouchableOpacity>

          <FlatList
            data={dateTimearr}
            renderItem={({ item, index }) => (
              <DateCard
                time={item}
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

        <View style={{ width: '90%' }}>
          <Text style={styles.headerText}>Add Images</Text>

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
        <View style={{ width: '90%', marginTop: 10, marginBottom: 10 }}>
          <Text style={styles.headerText}>Details (Optional)</Text>
          <DetailsInputTaker />
        </View>
        <View style={{ width: '90%', marginTop: 10, marginBottom: 10 }}>
          <CurvedButton
            btnText='Create Post'
            onPress={() => {
              console.log(dateTimeArray)
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
      </ScrollView> */}
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    marginTop: 100,
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
  },
  userBtnTxt: {
    color: colors.primary,
  },
})
export default PostSalesScreen
