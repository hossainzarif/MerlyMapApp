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
import TextInputTaker from '../components/inputs/TextInputTaker'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { ICON_SIZE_MED } from '../constants/Height_Width'
import { AuthContext } from '../Providers/AuthProvider'
import Loading from '../custom/Loading'

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const { resetPassword, loading } = useContext(AuthContext)

  if (loading) {
    return <Loading />
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.text_header}>
            Your email address used in this App
          </Text>
        </View>

        <View style={styles.footer}>
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
          <View style={styles.buttoncontainer}>
            <CurvedButton
              btnText='Reset Password'
              onPress={() => {
                resetPassword(email)
              }}
            />
          </View>
        </View>
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
    position: 'absolute',
    bottom: 20,
  },

  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  footer: {
    flex: 1,
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
    position: 'absolute',
    top: 50,
    left: 10,
  },
})

export default ForgotPasswordScreen
