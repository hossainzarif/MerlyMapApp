import React, { useState, useContext } from 'react'
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Alert,
} from 'react-native'
import CurvedButton from '../components/buttons/CurvedButton'
import colors from '../../assets/data/colors'
import TextInputTaker from '../components/inputs/TextInputTaker'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { ICON_SIZE_MED } from '../constants/Height_Width'
import { AuthContext } from '../Providers/AuthProvider'
import Loading from '../custom/Loading'
import PasswordInputTaker from '../components/inputs/PasswordInputTaker'
import { ScrollView } from 'react-native'
const ChangePassword = () => {
  const { updatePassword, loading } = useContext(AuthContext)
  if (loading) {
    return <Loading />
  } else {
    const [password, setPassword] = useState('')
    const [confpassword, setconfPassword] = useState('')
    const [oldpassword, setoldPassword] = useState('')

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.Header}>
          <Text style={styles.headerText}> Create New Password</Text>
          <Text style={styles.subtitleText}>
            Your new password must be different from previous used passwords.
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.subtitleText}>Old Password:</Text>

          <PasswordInputTaker
            onChangeText={function (currentInput) {
              setoldPassword(currentInput)
            }}
          />
          <Text style={styles.subtitleText}> New Password:</Text>

          <PasswordInputTaker
            onChangeText={function (currentInput) {
              setPassword(currentInput)
            }}
          />
          <Text style={styles.subtitleText}>Confirm Password:</Text>
          <PasswordInputTaker
            onChangeText={function (currentInput) {
              setconfPassword(currentInput)
            }}
          />

          <CurvedButton
            btnText='Reset Password'
            onPress={() => {
              if (confpassword && password && oldpassword) {
                if (confpassword != password) {
                  Alert.alert('Password must be same')
                } else {
                  updatePassword(oldpassword, confpassword)
                }
              } else {
                Alert.alert('Please fill up the blanks')
              }
            }}
          />
        </View>
      </KeyboardAvoidingView>
    )
  }
}

export default ChangePassword
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  Header: {
    flex: 1,
    width: '90%',
    marginTop: 10,
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  inputContainer: {
    flex: 4,
    width: '90%',
  },
  subtitleText: {
    padding: 5,
    fontSize: 15,
    color: colors.darkGray,
  },
})
