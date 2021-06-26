import React, { useState } from "react"
import { Alert } from "react-native"
import { TouchableOpacity, ScrollView } from "react-native"
import { View, Text, StyleSheet } from "react-native"
import { Linking } from "react-native"
import colors from "../../assets/data/colors"
import CurvedButton from "../components/buttons/CurvedButton"
import DetailsInputTaker from "../components/inputs/DetailsInputTaker"
import TextInputTaker from "../components/inputs/TextInputTaker"
import Loading from "../custom/Loading"
import { sendNote } from "../Providers/FirebaseFunc"
const ContactScreen = () => {
  const [message, setMessage] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  if (loading) {
    return <Loading />
  } else {
    return (
      <ScrollView style={styles.container}>
        <View style={{ padding: 12 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "black" }}>
            GET IN TOUCH WITH US
          </Text>
          <TouchableOpacity
            onPress={() => Linking.openURL("mailto:garagesalesmap1@gmail.com")}
          >
            <Text
              style={{
                fontSize: 16,
                color: "black",
                paddingTop: 10,
                textAlign: "justify",
              }}
            >
              Want to get in touch? We’d love to hear from you. To reach us,
              email us at
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                {" "}
                garagesalesmap1@gmail.com{" "}
              </Text>
              or leave a note below.
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <View
            style={{
              width: "92%",
            }}
          >
            <Text style={styles.headerText}>Name</Text>

            <TextInputTaker
              place='Name'
              onChangeText={function (currentInput) {
                setName(currentInput)
              }}
            />
          </View>
          <View
            style={{
              width: "92%",
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            <Text style={styles.headerText}>Email</Text>

            <TextInputTaker
              place='Email'
              onChangeText={function (currentInput) {
                setEmail(currentInput)
              }}
            />
          </View>
          <View
            style={{
              width: "92%",
            }}
          >
            <Text style={[styles.headerText, { marginBottom: 10 }]}>
              Message
            </Text>

            <DetailsInputTaker
              onChangeText={function (currentInput) {
                setMessage(currentInput)
              }}
            />
          </View>
          <View style={{ width: "90%", marginTop: 20, marginBottom: 10 }}>
            <CurvedButton
              btnText='Send'
              onPress={() => {
                if (name && email && message) {
                  sendNote(name, email, message, setLoading)
                } else {
                  Alert.alert("Please fill the required fields")
                }
              }}
            />
          </View>
        </View>
      </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  textdata: {
    fontSize: 18,
    textAlign: "center",
    padding: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.black,
  },
})

export default ContactScreen
