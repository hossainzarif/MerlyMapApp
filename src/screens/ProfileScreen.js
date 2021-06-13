import React, { useContext, useState, useEffect } from "react"
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Platform,
  ActivityIndicator,
} from "react-native"
import BottomSheet from "reanimated-bottom-sheet"
import Animated from "react-native-reanimated"
import colors from "../../assets/data/colors"
import { AuthContext } from "../Providers/AuthProvider"
import CurvedButton from "../components/buttons/CurvedButton"
import * as ImagePicker from "expo-image-picker"
import * as firebase from "firebase"

import { TouchableOpacity } from "react-native-gesture-handler"
import PersonalPostCard from "../cards/PersonalPostCard"
import { Alert } from "react-native"
import {
  deletePostFirebase,
  deletePostImageFirebase,
} from "../Providers/FirebaseFunc"

const ProfileScreen = ({ navigation }) => {
  const { logout, user, uploadProfilePic, deleteProfilePic } =
    useContext(AuthContext)

  const [image, setImage] = useState(null)
  const [personalposts, setpersonalposts] = useState([])
  const [loading, setloading] = useState(false)
  const [loadingdelete, setloadingdelete] = useState(false)

  const [picLoading, setpicLoading] = useState(false)
  const sheetRef = React.useRef(null)

  useEffect(() => {
    ;(async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!")
        }
      }
    })()
  }, [])
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 5],
      quality: 1,
    })

    console.log(result)

    if (!result.cancelled) {
      setImage(result.uri)
      uploadImage(result.uri)
      sheetRef.current.snapTo(2)
    }
  }
  const uploadImage = async (image) => {
    try {
      setpicLoading(true)
      const response = await fetch(image)
      const blob = await response.blob()
      var ref = firebase
        .storage()
        .ref()
        .child("images/profilepicture/" + user.uid)
      ref
        .put(blob)
        .then(() => {
          ref.getDownloadURL().then((downloadURL) => {
            uploadProfilePic(downloadURL)
          })
        })
        .then(() => {
          setpicLoading(false)
        })
    } catch (error) {
      setpicLoading(false)

      Alert.alert(error)
    }
  }

  const renderInner = () => (
    <View style={styles.panel}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.panelTitle}>Edit Profile</Text>
      </View>
      <TouchableOpacity style={styles.panelButton} onPress={pickImage}>
        <Text style={styles.panelButtonTitle}>
          Upload/Change profile picture
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => {
          {
            if (user.photoURL) {
              deleteProfilePic(setpicLoading)
            } else {
              Alert.alert("No profile picture to delete")
            }
            sheetRef.current.snapTo(2)
          }
        }}
      >
        <Text style={styles.panelButtonTitle}>Delete profile picture</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={function () {
          navigation.navigate("ChangePassword")
          sheetRef.current.snapTo(2)
        }}
      >
        <Text style={styles.panelButtonTitle}>Change password</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => {
          sheetRef.current.snapTo(2)
        }}
      >
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  )
  const deletePost = (id, imgs) => {
    if (imgs != null) {
      deletePostImageFirebase(id, setloadingdelete, imgs)
    } else {
      deletePostFirebase(id, setloadingdelete)
    }
  }
  const loadPosts = async () => {
    try {
      setloading(true)
      await firebase
        .firestore()
        .collection("posts")
        .where("user", "==", user.uid)
        .orderBy("timestamp", "desc")
        .onSnapshot((querySnapshot) => {
          let temp_posts = []
          querySnapshot.forEach((doc) => {
            temp_posts.push({
              id: doc.id,
              data: doc.data(),
            })
          })
          setpersonalposts(temp_posts)
          setloading(false)
        })
    } catch (error) {
      Alert.alert(error)
      setloading(false)
    }
  }

  useEffect(() => {
    loadPosts()
  }, [])

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  )
  function CheckPostLength(props) {
    const len = props.lengthofArr

    if (len > 0) {
      return personalposts.map((item) => (
        <PersonalPostCard
          key={item.id}
          title={item.data.title}
          details={item.data.details}
          img={item.data.pictures}
          onPress_delete={() => {
            Alert.alert(
              "Delete Post",
              "Are you sure you want to delete your post?",
              [
                {
                  text: "Cancel",
                  style: "cancel",
                },
                {
                  text: "Confirm",
                  onPress: () => {
                    deletePost(item.id, item.data.pictures)
                  },
                },
              ],
              { cancelable: true }
            )
          }}
          onPress={() => {
            navigation.navigate("Details", {
              address: item.data.location.coords.address,
              images: item.data.pictures,
              details: item.data.details,
              dates: item.data.dates,
              user_id: item.data.user,
            })
          }}
        />
      ))
    } else {
      return (
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              justifyContent: "center",
              alignItems: "center",
              padding: 100,
              fontSize: 20,
              color: colors.darkGray,
            }}
          >
            NO POST YET
          </Text>
        </View>
      )
    }
  }

  function CheckPicLoading() {
    if (user.photoURL) {
      return <Image style={styles.userImg} source={{ uri: user.photoURL }} />
    } else {
      return (
        <Image
          style={styles.userImg}
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
          }} //photoURL should be used
        />
      )
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[300, 200, 0]}
        initialSnap={2}
        renderContent={renderInner}
        renderHeader={renderHeader}
        enabledInnerScrolling={true}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
        showsVerticalScrollIndicator={false}
      >
        {picLoading ? (
          <ActivityIndicator
            size='large'
            color={colors.primary}
            animating={true}
          />
        ) : (
          <CheckPicLoading />
        )}

        <Text style={styles.userName}>{user.displayName}</Text>
        {/* <Text>{route.params ? route.params.userId : user.uid}</Text> */}
        <Text style={styles.aboutUser}>{user.email}</Text>
        <View style={styles.userBtnWrapper}>
          <TouchableOpacity
            style={styles.userBtn}
            onPress={() => sheetRef.current.snapTo(0)}
          >
            <Text style={styles.userBtnTxt}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.userBtn} onPress={() => logout()}>
            <Text style={styles.userBtnTxt}>Logout</Text>
          </TouchableOpacity>
        </View>

        <View style={{ width: "93%", marginBottom: 40 }}>
          {loading || loadingdelete ? (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 30,
              }}
            >
              <ActivityIndicator
                size='large'
                color={colors.primary}
                animating={true}
              />
            </View>
          ) : (
            <CheckPostLength lengthofArr={personalposts.length} />
          )}
        </View>

        {/* <Text
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 100,
            fontSize: 20,
            color: colors.darkGray,
          }}
        >
          NO POST YET
        </Text> */}
      </ScrollView>
    </SafeAreaView>
  )
}

export default ProfileScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
    paddingBottom: 20,
  },

  userImg: {
    height: 150,
    width: 150,
    borderRadius: 75,
    shadowColor: "black",
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },
  aboutUser: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    textAlign: "center",
    marginBottom: 10,
  },
  userBtnWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
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
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 20,
  },
  userInfoItem: {
    justifyContent: "center",
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  panel: {
    padding: 20,
    backgroundColor: colors.primary_fade,
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: { width: 0, height: 0 },
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: colors.primary_fade,
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 23,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 30,
    backgroundColor: colors.primary,
    alignItems: "center",
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
})
