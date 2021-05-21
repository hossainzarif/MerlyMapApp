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

const PostSalesScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ width: '90%' }}>
        <Text style={styles.headerText}>Location</Text>
        <TextInputTaker />
        <Text style={styles.headerText}>Or</Text>

        <TouchableOpacity style={styles.userBtn}>
          <Entypo name='location-pin' size={24} color={colors.primary} />
          <Text style={styles.userBtnTxt}>Use Current Location</Text>
        </TouchableOpacity>
      </View>
      <View style={{ width: '90%', backgroundColor: 'yellow' }}>
        <Text style={styles.headerText}>Date</Text>

        <TouchableOpacity style={styles.userBtn}>
          <Entypo name='plus' size={24} color={colors.primary} />
          <Text style={styles.userBtnTxt}>Add Date</Text>
        </TouchableOpacity>
      </View>

      <View style={{ backgroundColor: 'green', width: '90%' }}></View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
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
