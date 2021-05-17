import React, { useContext } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native'
import colors from '../../assets/data/colors'
import { AuthContext } from '../Providers/AuthProvider'
const ProfileScreen = () => {
  const { logout, user } = useContext(AuthContext)
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
        showsVerticalScrollIndicator={false}
      >
        <Image
          style={styles.userImg}
          source={{ uri: 'https://picsum.photos/id/1074/200/300' }} //photoURL should be used
        />
        <Text style={styles.userName}>{user.displayName}</Text>
        {/* <Text>{route.params ? route.params.userId : user.uid}</Text> */}
        <Text style={styles.aboutUser}>{user.email}</Text>
        <View style={styles.userBtnWrapper}>
          <TouchableOpacity
            style={styles.userBtn}
            onPress={() => {
              console.log('WORKS')
            }}
          >
            <Text style={styles.userBtnTxt}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.userBtn} onPress={() => logout()}>
            <Text style={styles.userBtnTxt}>Logout</Text>
          </TouchableOpacity>
        </View>

        <Text
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 100,
            fontSize: 20,
            color: colors.darkGray,
          }}
        >
          NO POST YET
        </Text>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ProfileScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  userImg: {
    height: 150,
    width: 150,
    borderRadius: 75,
    shadowColor: 'black',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  aboutUser: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  userBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
  },
  userBtn: {
    borderColor: colors.primary,
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  userBtnTxt: {
    color: colors.primary,
  },
  userInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },
  userInfoItem: {
    justifyContent: 'center',
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
})
