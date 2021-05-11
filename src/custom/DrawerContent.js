import React from 'react'

import { View, StyleSheet } from 'react-native'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper'

import { SimpleLineIcons, AntDesign, MaterialIcons } from '@expo/vector-icons'
import { DRAWER_ICON_SIZE } from '../constants/Height_Width'
import { FontAwesome5 } from '@expo/vector-icons'
const DrawerContent = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: 'row', marginTop: 15 }}>
              <Avatar.Image
                source={{
                  uri: 'https://picsum.photos/seed/picsum/200/300',
                }}
                size={50}
              />
              <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                <Title style={styles.title}>Merly</Title>
                <Caption style={styles.caption}>@merly@gmail.com</Caption>
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
                props.navigation.navigate('Home')
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
                props.navigation.navigate('Profile')
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
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem label='Terms and service' />
        <DrawerItem label='Privacy Policy' />
        <DrawerItem
          icon={() => (
            <SimpleLineIcons
              name='logout'
              size={DRAWER_ICON_SIZE}
              color='black'
            />
          )}
          label='Sign Out'
        />
      </Drawer.Section>
    </View>
  )
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    paddingRight: 10,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
})

export default DrawerContent
