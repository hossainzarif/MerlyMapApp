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
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
