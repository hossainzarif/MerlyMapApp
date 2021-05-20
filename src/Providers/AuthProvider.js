import React, { createContext, useState } from 'react'
import { Alert } from 'react-native'
import { auth } from '../utils/firebase'
import * as firebase from 'firebase'

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
            Alert.alert('Error', e.message)
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

            Alert.alert('Error', e.message)
          }
        },
        logout: async () => {
          try {
            setLoading(true)

            await auth.signOut()
            setLoading(false)
          } catch (e) {
            Alert.alert('Error', e.message)
            setLoading(false)
          }
        },
        resetPassword: async (email) => {
          try {
            setLoading(true)

            await auth.sendPasswordResetEmail(email).then(() => {
              setLoading(false)

              Alert.alert('Sent', 'Password reset email has been sent')
            })
          } catch (e) {
            Alert.alert('Error', e.message)
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
                    Alert.alert('Updated', 'Password has been Updated')
                    setLoading(false)
                  })
                  .catch(function (error) {
                    Alert.alert('Error', error.message)
                    setLoading(false)
                  })
                setLoading(false)
              })
              .catch(function (error) {
                // An error happened.
                Alert.alert('Error', error.message)

                setLoading(false)
              })
          } catch (e) {
            Alert.alert('Error', e.message)

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

                Alert.alert('Uploaded', 'Profile Picture Uploaded')
              })
              .catch(function (error) {
                Alert.alert('Error', error.message)
                setLoading(false)
              })
          } catch (error) {
            Alert.alert('Error', error.message)
            setLoading(false)
          }
        },
        deleteProfilePic: async () => {
          setLoading(true)

          await user
            .updateProfile({
              photoURL: null,
            })
            .then(function () {
              setLoading(false)

              Alert.alert('Deleted', 'Profile Picture Deleted')
            })
            .catch(function (error) {
              Alert.alert('Error', error.message)
              setLoading(false)
            })
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
