import React, { useState, useEffect, useContext } from "react"
import { NavigationContainer } from "@react-navigation/native"
import AppStack from "./AppStack"
import AuthStack from "./AuthStack"
import OnboardStack from "./OnboardStack"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { auth } from "../utils/firebase"
import { AuthContext, AuthProvider } from "../Providers/AuthProvider"
import DrawerNav from "./DrawerNav"
import * as Google from "expo-google-app-auth"

const RootNav = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null)

  //Auth States

  const { user, setUser } = useContext(AuthContext)
  const [initializing, setInitializing] = useState(true)

  const onAuthStateChanged = (user) => {
    setUser(user)
    if (initializing) {
      setInitializing(false)
    }
  }

  // Firebase Init
  useEffect(() => {
    AsyncStorage.getItem("alreadyLaunched").then((value) => {
      if (value == null) {
        AsyncStorage.setItem("alreadyLaunched", "true")
        setIsFirstLaunch(true)
      } else {
        setIsFirstLaunch(false)
      }
    })
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged)
    return subscriber
  }, [])

  if (initializing) {
    return null
  } else {
    if (isFirstLaunch == null) {
      return null
    } else if (isFirstLaunch == true) {
      return (
        <NavigationContainer>
          {user ? <DrawerNav /> : <OnboardStack />}
        </NavigationContainer>
      )
    } else {
      return (
        <NavigationContainer>
          {user ? <DrawerNav /> : <AuthStack />}
        </NavigationContainer>
      )
    }
  }
}

export default RootNav
