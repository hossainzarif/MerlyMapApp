import React, { createContext, useState } from 'react'
import { Alert } from 'react-native'
import { auth } from '../utils/firebase'

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

        updatePassword: async (newPassword) => {
          try {
            setLoading(true)
            const credential = firebase.auth.EmailAuthProvider.credential(
              user.email,
              userProvidedPassword
            )
            await user
              .reauthenticateWithCredential()
              .then(function () {
                Alert.alert('REAUTH', 'Password has been Updated')
                setLoading(false)
              })
              .catch(function (error) {
                // An error happened.
                console.log('Error', error.message)

                setLoading(false)
              })

            // await user
            //   .updatePassword(newPassword)
            //   .then(function () {
            //     Alert.alert('Updated', 'Password has been Updated')
            //     setLoading(false)
            //   })
            //   .catch(function (error) {
            //     Alert.alert('Error', error.message)
            //     setLoading(false)
            //   })
          } catch (e) {
            Alert.alert('Error', e.message)
            setLoading(false)
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
