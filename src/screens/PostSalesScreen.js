import React, { useContext, useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { AuthContext } from '../Providers/AuthProvider'
import { FAB } from 'react-native-paper'
import colors from '../../assets/data/colors'
import TextInputTaker from '../components/inputs/TextInputTaker'
import { ScrollView } from 'react-native'
import CurvedButton from '../components/buttons/CurvedButton'
import { Button } from 'react-native-elements'
import { Entypo } from '@expo/vector-icons'
import { BUTTON_RADIUS, HEIGHT_BUTTON } from '../constants/Height_Width'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import DateCard from '../cards/DateCard'
import { SafeAreaView } from 'react-native'

const PostSalesScreen = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  const [isDatePickerVisible_2, setDatePickerVisibility_2] = useState(false)

  const showDatePicker = () => {
    setDatePickerVisibility(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const handleConfirm = (date) => {
    console.log('A date has been picked: ', date)

    showDatePicker_2()
  }

  const showDatePicker_2 = () => {
    setDatePickerVisibility_2(true)
  }

  const hideDatePicker_2 = () => {
    setDatePickerVisibility(false)
    setDatePickerVisibility_2(false)
  }

  const handleConfirm_2 = (time) => {
    console.log('time:', time)

    hideDatePicker_2()
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
        <View style={{ width: '90%' }}>
          <Text style={styles.headerText}>Location</Text>
          <TextInputTaker />
          <Text style={styles.headerText}>Or</Text>

          <TouchableOpacity style={styles.userBtn}>
            <Entypo name='location-pin' size={24} color={colors.primary} />
            <Text style={styles.userBtnTxt}>Use Current Location</Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: '90%', marginTop: 10 }}>
          <Text style={styles.headerText}>Date & Time Range (Optional)</Text>

          <TouchableOpacity style={styles.userBtn} onPress={showDatePicker}>
            <Entypo name='plus' size={24} color={colors.primary} />
            <Text style={styles.userBtnTxt}>Add Images</Text>
          </TouchableOpacity>
        </View>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode='datetime'
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />

        <DateTimePickerModal
          isVisible={isDatePickerVisible_2}
          mode='time'
          onConfirm={handleConfirm_2}
          onCancel={hideDatePicker_2}
        />

        <ScrollView
          contentContainerStyle={{
            flexDirection: 'row',
            height: 50,
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <DateCard />
          <DateCard />
          <DateCard />
          <DateCard />

          <DateCard />

          <DateCard />
        </ScrollView>
        <View style={{ width: '90%', marginTop: 10 }}>
          <Text style={styles.headerText}>Add Images (Optional)</Text>

          <TouchableOpacity style={styles.userBtn} onPress={showDatePicker}>
            <Entypo name='camera' size={24} color={colors.primary} />
            <Text style={styles.userBtnTxt}> Add Date and Time</Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: '90%', marginTop: 10, marginBottom: 10 }}>
          <Text style={styles.headerText}>Details (Optional)</Text>
          <TextInputTaker />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
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
  },
  userBtnTxt: {
    color: colors.primary,
  },
})
export default PostSalesScreen
