import React, { useState } from 'react'
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  CheckBox,
} from 'react-native'
import CurvedButton from '../components/buttons/CurvedButton'
import colors from '../../assets/data/colors'
import color from 'color'
import TextInputTaker from '../components/inputs/TextInputTaker'
import PasswordInputTaker from '../components/inputs/PasswordInputTaker'
import { ICON_SIZE_MED } from '../constants/Height_Width'
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Entypo,
} from '@expo/vector-icons'
import TextButton from '../components/buttons/TextButton'
import IconButton from '../components/buttons/IconButton'
import CheckButton from '../components/buttons/CheckButton'
const SignUpScreen = (props) => {
  const [isSelected, setSelection] = useState(false)

  return (
    <View
      style={styles.container}
      //   behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <View style={styles.iconButtonStyle}>
          <IconButton
            icon={<Entypo name='chevron-left' size={32} color='white' />}
            onpress={function () {
              props.navigation.goBack()
            }}
          />
        </View>
        <Text style={styles.text_header}>SIGN UP</Text>
      </View>

      <KeyboardAvoidingView style={styles.footer} behavior='padding'>
        <View style={styles.inputContainer}>
          <TextInputTaker
            place='Username'
            lefticon={
              <MaterialIcons
                name='person'
                size={ICON_SIZE_MED}
                color={colors.primary}
              />
            }
          />

          <TextInputTaker
            place='Email'
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

        <View style={styles.checkContainer}>
          <CheckBox
            value={isSelected}
            onValueChange={setSelection}
            style={styles.checkbox}
            tintColors={{
              true: colors.primary,
              false: colors.primary_dark,
            }}
          />
          <Text style={styles.textStyle}> I agree to </Text>
          <TextButton textIn='Terms of service' />
          <Text> and </Text>
          <TextButton textIn='Privacy Policy' />
        </View>

        <View style={styles.buttoncontainer}>
          <CurvedButton btnText='Sign Up'></CurvedButton>
          <View style={styles.signupfirst}>
            <Text style={styles.textStyle}>Already have an Account? </Text>
            <TextButton textIn='Sign In' />
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  buttoncontainer: {
    width: '98%',
    position: 'absolute',
    bottom: 5,
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  footer: {
    flex: 2,
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
  iconButtonStyle: {
    paddingBottom: 80,
  },
  checkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    width: '98%',
  },
  checkbox: {
    alignSelf: 'flex-start',
  },
})

export default SignUpScreen
