import React, { useState, useContext } from 'react'
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native'
import CurvedButton from '../components/buttons/CurvedButton'
import colors from '../../assets/data/colors'
import color from 'color'
import TextInputTaker from '../components/inputs/TextInputTaker'
import PasswordInputTaker from '../components/inputs/PasswordInputTaker'
import { ICON_SIZE_MED } from '../constants/Height_Width'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import TextButton from '../components/buttons/TextButton'
import IconButton from '../components/buttons/IconButton'
import { Entypo } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AuthContext } from '../Providers/AuthProvider'
import Loading from '../custom/Loading'
import {
  TapGestureHandler,
  RotationGestureHandler,
} from 'react-native-gesture-handler'

const SignInScreen = ({ navigation }) => {
  const [password, setPassword] = useState('')
  const { login, loading } = useContext(AuthContext)
  const [email, setEmail] = useState('')

  if (loading) {
    return <Loading />
  } else {
    return (
      <View
        style={styles.container}
        // behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.header}>
          {/* <View style={styles.iconButtonStyle}>
          <IconButton
            icon={<Entypo name='chevron-left' size={32} color='white' />}
            onpress={function () {
              navigation.goBack()
            }}
          />
        </View> */}
          <Text style={styles.text_header}>Sign In</Text>
        </View>

        <KeyboardAvoidingView style={styles.footer} behavior='padding'>
          <View style={styles.inputContainer}>
            <TextInputTaker
              place='Email'
              lefticon={
                <MaterialCommunityIcons
                  name='email'
                  size={ICON_SIZE_MED}
                  color={colors.primary}
                />
              }
              onChangeText={function (currentInput) {
                setEmail(currentInput)
              }}
            />
            <PasswordInputTaker
              pass={password}
              onChangeText={function (currentInput) {
                setPassword(currentInput)
              }}
            />
          </View>

          <View style={styles.forgotButton}>
            <View style={styles.textButtonContainer}>
              <TextButton
                textIn='Forgot Password?'
                onPress={function () {
                  navigation.navigate('ForgotPassword')
                }}
              />
            </View>
          </View>

          <View style={styles.buttoncontainer}>
            <CurvedButton
              btnText='Sign In'
              onPress={() => {
                login(email, password)
              }}
            ></CurvedButton>
            <View style={styles.signupfirst}>
              <Text style={styles.textStyle}>Don't have an Account? </Text>
              <TextButton
                textIn='Sign Up'
                onPress={function () {
                  navigation.navigate('SignUpScreen')
                }}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  buttoncontainer: {
    width: '98%',
    marginTop: 10,
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
    paddingBottom: 100,
  },
})

export default SignInScreen
