import React, { createContext, useState } from "react"
import { Alert } from "react-native"
import { auth } from "../utils/firebase"
import * as firebase from "firebase"
import * as Google from "expo-google-app-auth"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  return (
    <AuthContext.Provider
      value={{
        loading,
        setLoading,
        user,
        setUser,
        login: async (email, password) => {
          setLoading(true)
          try {
            await auth.signInWithEmailAndPassword(email, password)
            setLoading(false)
          } catch (e) {
            setLoading(false)
            Alert.alert("Error", e.message)
          }
        },
        register: async (email, password, name) => {
          try {
            setLoading(true)

            await auth
              .createUserWithEmailAndPassword(email, password)
              .then((authUser) => {
                setLoading(false)

                authUser.user.updateProfile({
                  displayName: name,
                })
              })
          } catch (e) {
            setLoading(false)

            Alert.alert("Error", e.message)
          }
        },
        logout: async () => {
          try {
            setLoading(true)

            await auth.signOut()
            setLoading(false)
          } catch (e) {
            Alert.alert("Error", e.message)
            setLoading(false)
          }
        },
        resetPassword: async (email) => {
          try {
            setLoading(true)

            await auth.sendPasswordResetEmail(email).then(() => {
              setLoading(false)

              Alert.alert("Sent", "Password reset email has been sent")
            })
          } catch (e) {
            Alert.alert("Error", e.message)
            setLoading(false)
          }
        },

        updatePassword: (userProvidedPassword, newPassword) => {
          var credentials = firebase.auth.EmailAuthProvider.credential(
            user.email,
            userProvidedPassword
          )
          try {
            setLoading(true)

            user
              .reauthenticateWithCredential(credentials)
              .then(function () {
                user
                  .updatePassword(newPassword)
                  .then(function () {
                    Alert.alert("Updated", "Password has been Updated")
                    setLoading(false)
                  })
                  .catch(function (error) {
                    Alert.alert("Error", error.message)
                    setLoading(false)
                  })
                setLoading(false)
              })
              .catch(function (error) {
                // An error happened.
                Alert.alert("Error", error.message)

                setLoading(false)
              })
          } catch (e) {
            Alert.alert("Error", e.message)

            setLoading(false)
          }
        },

        uploadProfilePic: async (imageurl) => {
          setLoading(true)

          try {
            await user
              .updateProfile({
                photoURL: imageurl,
              })
              .then(function () {
                setLoading(false)
              })
              .catch(function (error) {
                Alert.alert("Error", error.message)
                setLoading(false)
              })
          } catch (error) {
            Alert.alert("Error", error.message)
            setLoading(false)
          }
        },
        deleteProfilePic: async (setpicLoading) => {
          setpicLoading(true)

          await user
            .updateProfile({
              photoURL: null,
            })
            .then(function () {
              setpicLoading(false)
            })
            .catch(function (error) {
              Alert.alert("Error", error.message)
              setpicLoading(false)
            })
        },

        loginWithGoogle: async () => {
          try {
            const result = await Google.logInAsync({
              behavior: "web",
              androidClientId:
                "888836721819-h3st1q989k82t3a3f4ht38r7un5461e0.apps.googleusercontent.com",
              // iosClientId: YOUR_CLIENT_ID_HERE,
              scopes: ["profile", "email"],
            })

            if (result.type === "success") {
              setLoading(true)
              const { idToken, accessToken } = result
              const credential = firebase.auth.GoogleAuthProvider.credential(
                idToken,
                accessToken
              )

              firebase
                .auth()
                .signInWithCredential(credential)
                .then(function () {
                  console.log(user)
                  setLoading(false)
                })
            } else {
              setLoading(false)
            }
          } catch (e) {
            Alert.alert(e)
            setLoading(false)
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
