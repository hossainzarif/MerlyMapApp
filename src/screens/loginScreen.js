import React from 'react'
import { Text, StyleSheet, View, TextInput, SafeAreaView } from 'react-native'
import CurvedButton from '../components/buttons/CurvedButton'
import colors from '../../assets/data/colors'
import color from 'color'
import TextInputTaker from '../components/inputs/TextInputTaker'
import PasswordInputTaker from '../components/inputs/PasswordInputTaker'
import { ICON_SIZE_MED } from '../constants/Height_Width'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import TextButton from '../components/buttons/TextButton'

const loginScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>WELCOME !</Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.inputContainer}>
          <TextInputTaker
            email='Email'
            lefticon={
              <MaterialCommunityIcons
                name='email'
                size={ICON_SIZE_MED}
                color={colors.primary}
              />
            }
          />
          <PasswordInputTaker />
        </View>

        <View style={styles.forgotButton}>
          <View style={styles.textButtonContainer}>
            <TextButton textIn='Forgot Password?' />
          </View>
        </View>

        <View style={styles.buttoncontainer}>
          <CurvedButton btnText='Sign In'></CurvedButton>
          <View style={styles.signupfirst}>
            <Text style={styles.textStyle}>Don't have an Account? </Text>
            <TextButton textIn='Sign Up' />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  buttoncontainer: {
    position: 'absolute',
    bottom: 50,
    width: '98%',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  footer: {
    flex: 2.4,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: 'center',
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 28,
  },
  inputContainer: {
    width: '98%',
  },
  forgotButton: {
    width: '95%',
    margin: 10,
  },
  signupfirst: {
    width: '95%',
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  fontStyleBottom: {
    fontSize: 12,
    color: colors.primary_dark,
  },
  textButtonContainer: { alignItems: 'flex-end' },
  textStyle: {
    fontSize: 14,
    color: colors.darkGray,
  },
})

export default loginScreen
