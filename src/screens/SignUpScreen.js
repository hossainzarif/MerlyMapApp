import React, { useState, useContext } from "react"
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native"
import Modal from "react-native-modal"

import { Checkbox } from "react-native-paper"
import CurvedButton from "../components/buttons/CurvedButton"
import colors from "../../assets/data/colors"
import color from "color"
import TextInputTaker from "../components/inputs/TextInputTaker"
import PasswordInputTaker from "../components/inputs/PasswordInputTaker"
import { ICON_SIZE_MED } from "../constants/Height_Width"
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Entypo,
} from "@expo/vector-icons"
import TextButton from "../components/buttons/TextButton"
import IconButton from "../components/buttons/IconButton"
import CheckButton from "../components/buttons/CheckButton"
import { Colors } from "react-native/Libraries/NewAppScreen"
import ModalPrivacy from "../components/modals/ModalPrivacy"
import ModalTerms from "../components/modals/ModalTerms"
import { PRIVACY, TERMS } from "../constants/stringsConstants"
import { AuthContext } from "../Providers/AuthProvider"
import Loading from "../custom/Loading"
import * as Linking from "expo-linking"

import { Platform } from "react-native"
import { PRIVACY_POLICY_LINK, TERMS_SERVICES_LINK } from "../constants/WebLinks"
const SignUpScreen = ({ navigation }) => {
  // const [isvisible_terms, setisvisible_terms] = useState(false)
  // const [isvisible_privacy, setisvisible_privacy] = useState(false)

  const [checked, setChecked] = useState(false)
  // const [isModalVisible, setModalVisible] = useState(true)
  const [modalVisible, setModalVisible] = useState(false)
  const [modalVisible_terms, setModalVisible_terms] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const { register, loading } = useContext(AuthContext)

  if (loading) {
    return <Loading />
  } else {
    return (
      <View
        style={styles.container}
        //   behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
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
          <Text style={styles.text_header}>SIGN UP</Text>
        </View>

        <KeyboardAvoidingView
          style={styles.footer}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
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
              onChangeText={function (currentInput) {
                setUsername(currentInput)
              }}
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
              onChangeText={function (currentInput) {
                setEmail(currentInput)
              }}
            />
            <PasswordInputTaker
              onChangeText={function (currentInput) {
                setPassword(currentInput)
              }}
            />
          </View>

          <View style={styles.checkContainer}>
            <Checkbox.Android
              status={checked ? "checked" : "unchecked"}
              onPress={() => {
                setChecked(!checked)
              }}
              color={colors.primary_dark}
              uncheckedColor={colors.primary}
            />
            <Text style={styles.textStyle}> I agree to </Text>
            <TextButton
              textIn='Terms of Service'
              onPress={function () {
                Linking.openURL(TERMS_SERVICES_LINK)
              }}
            />
            <Text> and </Text>
            <TextButton
              textIn='Privacy Policy'
              onPress={function () {
                Linking.openURL(PRIVACY_POLICY_LINK)
              }}
            />
          </View>

          <View style={styles.buttoncontainer}>
            <CurvedButton
              chk={!checked}
              btnText='Sign Up'
              onPress={() => register(email, password, username)}
            ></CurvedButton>
            <View style={styles.signupfirst}>
              <Text style={styles.textStyle}>Already have an Account? </Text>
              <TextButton
                textIn='Sign In'
                onPress={function () {
                  navigation.navigate("SignInScreen")
                }}
              />
            </View>
          </View>
        </KeyboardAvoidingView>

        <View style={styles.centeredView}>
          <ModalPrivacy
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
          <ModalTerms
            modalVisible_terms={modalVisible_terms}
            setModalVisible_terms={setModalVisible_terms}
          />
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
    width: "98%",
    marginTop: 10,
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: "center",
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 28,
  },
  inputContainer: {
    width: "98%",
  },
  forgotButton: {
    width: "95%",
    margin: 10,
  },
  signupfirst: {
    width: "95%",
    margin: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  fontStyleBottom: {
    fontSize: 12,
    color: colors.primary_dark,
  },
  textButtonContainer: { alignItems: "flex-end" },
  textStyle: {
    fontSize: 14,
    color: colors.darkGray,
  },
  iconButtonStyle: {
    paddingBottom: 100,
  },
  checkContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    width: "98%",
  },
  checkbox: {
    alignSelf: "flex-start",
  },
})

export default SignUpScreen
