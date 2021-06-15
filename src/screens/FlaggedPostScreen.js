import React, { useState, useEffect } from "react"
import { View, Text, Alert, StyleSheet } from "react-native"
import colors from "../../assets/data/colors"
import FlaggedPostCard from "../cards/FlaggedPostCard"
import Loading from "../custom/Loading"
import { deletePostFirebase } from "../Providers/FirebaseFunc"
import { db } from "../utils/firebase"

const FlaggedPostScreen = ({ navigation }) => {
  const [flaggedPost, setflaggedPost] = useState([])
  const [loading, setloading] = useState(false)
  const loadPosts = async () => {
    try {
      setloading(true)
      await db
        .collection("posts")
        .where("flagged", "==", true)
        .orderBy("timestamp", "desc")
        .onSnapshot((querySnapshot) => {
          let temp_posts = []
          querySnapshot.forEach((doc) => {
            temp_posts.push({
              id: doc.id,
              data: doc.data(),
            })
          })
          setflaggedPost(temp_posts)
          setloading(false)
          console.log(flaggedPost)
        })
    } catch (error) {
      Alert.alert("Error:", error.message)

      setloading(false)
    }
  }

  useEffect(() => {
    loadPosts()
  }, [])

  function CheckPostLength(props) {
    const len = props.lengthofArr

    if (len > 0) {
      return flaggedPost.map((item) => (
        <FlaggedPostCard
          key={item.id}
          title={item.data.title}
          name={item.data.user_name}
          user_id={item.data.user}
          onPress_delete={() => {
            Alert.alert(
              "Delete Post",
              "Are you sure you want to delete flagged post?",
              [
                {
                  text: "Cancel",
                  style: "cancel",
                },
                {
                  text: "Confirm",
                  onPress: () => {
                    deletePostFirebase(item.id, setloading)
                  },
                },
              ],
              { cancelable: true }
            )
          }}
          onPress={() => {
            navigation.navigate("FlaggedPostDetails", {
              name: item.data.user_name,
              user_id: item.data.user,
              email: item.data.email,
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
            NO FLAGGED POST YET
          </Text>
        </View>
      )
    }
  }

  if (loading) {
    return <Loading />
  } else {
    return (
      <View>
        {flaggedPost.length > 0 ? (
          <Text style={styles.headerText}>Flagged Post</Text>
        ) : null}

        <CheckPostLength lengthofArr={flaggedPost.length} />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  headerText: {
    fontSize: 18,
    padding: 10,
  },
})
export default FlaggedPostScreen
