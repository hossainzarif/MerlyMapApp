import React, { useState, useContext } from "react"
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native"
import CurvedButton from "../components/buttons/CurvedButton"
import colors from "../../assets/data/colors"
import color from "color"
import TextInputTaker from "../components/inputs/TextInputTaker"
import PasswordInputTaker from "../components/inputs/PasswordInputTaker"
import { ICON_SIZE_MED } from "../constants/Height_Width"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import TextButton from "../components/buttons/TextButton"
import IconButton from "../components/buttons/IconButton"
import { Entypo } from "@expo/vector-icons"
import { SocialIcon } from "react-native-elements"
import { AuthContext } from "../Providers/AuthProvider"
import Loading from "../custom/Loading"

const WelcomeScreen = ({ navigation }) => {
  const [Password, setPassword] = useState("")
  const { loginWithGoogle, loading } = useContext(AuthContext)

  if (loading) return <Loading />
  else {
    return (
      <View
        style={styles.container}
        // behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.header}>
          <Text style={styles.text_header}>Welcome to Garage Sales Map</Text>
        </View>

        <View style={styles.footer}>
          <View style={styles.buttoncontainer}>
            {/* <SocialIcon
              raised={true}
              title='Continue With Facebook'
              button
              type='facebook'
            /> */}
            <SocialIcon
              raised={true}
              title='Continue With Google'
              button
              type='google'
              onPress={() => {
                loginWithGoogle()
              }}
            />

            <SocialIcon
              onPress={() => {
                navigation.navigate("SignInScreen")
              }}
              raised={true}
              title='Sign In With Email'
              button
              type='envelope'
            />

            <View style={styles.signupfirst}>
              <Text style={styles.textStyle}>Don't have an Account? </Text>
              <TextButton
                textIn='Sign Up'
                onPress={function () {
                  navigation.navigate("SignUpScreen")
                }}
              />
            </View>
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
    width: "98%",
  },
  header: {
    flex: 1.4,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  footer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: "center",
    justifyContent: "center",
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
    position: "absolute",
    top: 50,
    left: 10,
  },
})

export default WelcomeScreen
