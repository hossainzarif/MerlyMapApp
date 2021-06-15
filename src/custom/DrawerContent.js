import React, { useContext } from "react"

import { View, StyleSheet } from "react-native"
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer"
import {
  useTheme,
  Title,
  Caption,
  Avatar,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from "react-native-paper"
// import { Avatar } from 'react-native-elements'
import { SimpleLineIcons, AntDesign, MaterialIcons } from "@expo/vector-icons"
import { DRAWER_ICON_SIZE } from "../constants/Height_Width"
import { FontAwesome5 } from "@expo/vector-icons"
import { Foundation } from "@expo/vector-icons"

import { AuthContext } from "../Providers/AuthProvider"
import colors from "../../assets/data/colors"
import { TouchableOpacity } from "react-native"
const DrawerContent = (props) => {
  const { logout, user } = useContext(AuthContext)

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate("Profile")
                }}
              >
                {user.photoURL ? (
                  <Avatar.Image
                    source={{
                      uri: user.photoURL, //user.photoURL should be added
                    }}
                    size={60}
                  />
                ) : (
                  <Avatar.Icon
                    size={60}
                    icon='account'
                    color='white'
                    style={{ backgroundColor: colors.primary }}
                  />
                )}
              </TouchableOpacity>
              <View style={{ marginLeft: 15, flexDirection: "column" }}>
                <Title style={styles.title}>{user.displayName}</Title>
                <Caption style={styles.caption}>{user.email}</Caption>
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={() => (
                <AntDesign name='home' size={DRAWER_ICON_SIZE} color='black' />
              )}
              label='Home'
              onPress={() => {
                props.navigation.navigate("Home")
              }}
            />
            <DrawerItem
              icon={() => (
                <MaterialIcons
                  name='person-outline'
                  size={DRAWER_ICON_SIZE + 1}
                  color='black'
                />
              )}
              label='Profile'
              onPress={() => {
                props.navigation.navigate("Profile")
              }}
            />
            <DrawerItem
              icon={() => (
                <AntDesign
                  name='message1'
                  size={DRAWER_ICON_SIZE}
                  color='black'
                />
              )}
              label='Inbox'
            />
            <DrawerItem
              icon={() => (
                <FontAwesome5
                  name='telegram-plane'
                  size={DRAWER_ICON_SIZE}
                  color='black'
                />
              )}
              label='Contact Us'
              onPress={() => {
                console.log(user)
              }}
            />

            {user.email == "admin@gmail.com" ? (
              <DrawerItem
                icon={() => (
                  <FontAwesome5
                    name='flag'
                    size={DRAWER_ICON_SIZE}
                    color='black'
                  />
                )}
                label='Flagged'
                onPress={() => {
                  console.log(user)
                }}
              />
            ) : null}
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={() => (
            <Foundation
              name='page-copy'
              size={DRAWER_ICON_SIZE}
              color='black'
            />
          )}
          label='Terms and service'
        />
        <DrawerItem
          icon={() => (
            <Foundation name='page-pdf' size={DRAWER_ICON_SIZE} color='black' />
          )}
          label='Privacy Policy'
        />
        <DrawerItem
          icon={() => (
            <SimpleLineIcons
              name='logout'
              size={DRAWER_ICON_SIZE}
              color='black'
            />
          )}
          label='Sign Out'
          onPress={() => {
            logout()
          }}
        />
      </Drawer.Section>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    paddingRight: 10,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
})

export default DrawerContent
