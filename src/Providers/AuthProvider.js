import React, { createContext, useState } from 'react'
import { Alert } from 'react-native'
import { auth } from '../utils/firebase'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await auth.signInWithEmailAndPassword(email, password)
          } catch (e) {
            Alert.alert('Error', e.message)
          }
        },
        register: async (email, password, name) => {
          try {
            await auth
              .createUserWithEmailAndPassword(email, password)
              .then((authUser) => {
                authUser.user.updateProfile({
                  displayName: name,
                })
              })
              .catch((e) => {
                Alert.alert('Error', e.message)
              })
          } catch (e) {
            console.log(e)
          }
        },
        logout: async () => {
          try {
            await auth.signOut()
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
