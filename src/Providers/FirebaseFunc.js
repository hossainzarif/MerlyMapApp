import "firebase/firestore"
import * as firebase from "firebase"
import { Alert } from "react-native"
import { db } from "../utils/firebase"

export function addPost(
  allLocation,
  titlePost,
  dateTimearr,
  DetailsText,
  fileDownloadUrls,
  uid,
  name,
  setIsLoading,
  setdateTimearr,
  setallLocation,
  setimages
) {
  setIsLoading(true)
  db.collection("posts")
    .add({
      location: allLocation,
      title: titlePost,
      dates: dateTimearr,
      details: DetailsText,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      pictures: fileDownloadUrls,
      user: uid,
      user_name: name,
      flagged: false,
    })
    .then(() => {
      setdateTimearr([])
      setallLocation(null)
      setimages([])
      Alert.alert("Post Created")
      setIsLoading(false)
    })
    .catch((error) => {
      Alert.alert("Error:", error.message)
      setIsLoading(false)
    })
}
export function deletePostFirebase(id, setloadingdelete) {
  setloadingdelete(true)
  db.collection("posts")
    .doc(id)
    .delete()
    .then(() => {
      Alert.alert("Post deleted")
      setloadingdelete(false)
    })
    .catch((error) => {
      setloadingdelete(false)

      Alert.alert("Error:", error.message)
    })
}
export function deletePostImageFirebase(id, setloadingdelete, imgs) {
  setloadingdelete(true)

  const promises = imgs.map((file) => {
    const storageRef = firebase.storage().refFromURL(file)
    const imageRef = firebase.storage().ref(storageRef.fullPath)

    return imageRef.delete()
  })

  Promise.all(promises).then(() => {
    db.collection("posts")
      .doc(id)
      .delete()
      .then(() => {
        Alert.alert("Post deleted")
        setloadingdelete(false)
      })
      .catch((error) => {
        setloadingdelete(false)

        Alert.alert("Error:", error.message)
      })
  })
}
export async function FlagPost(post_id, user_id, setflagLoading, flagger) {
  setflagLoading(true)
  const postref = db.collection("posts").doc(post_id)
  await postref
    .update({ flagged: true })
    .then(() => {
      db.collection("users")
        .doc(user_id)
        .collection("flaggers")
        .doc(flagger)
        .set({
          flagger_id: flagger,
        })
        .then(() => {
          db.collection("posts")
            .doc(post_id)
            .collection("flaggers")
            .doc(flagger)
            .set({
              flagger_id: flagger,
            })
        })
    })
    .then(() => {
      Alert.alert("Flagged the post")
      setflagLoading(false)
    })
    .catch((error) => {
      Alert.alert(error)
      setflagLoading(false)
    })
}
