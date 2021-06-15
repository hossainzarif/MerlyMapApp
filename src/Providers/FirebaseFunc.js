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
      Alert.alert(error)
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

      console.error("Error", error)
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

        console.error("Error", error)
      })
  })
}
export async function FlagPost(post_id, user_id) {
  const postref = db.collection("posts").doc(post_id)
  await postref
    .update({ flagged: true })
    .then(() => {
      const userRef = db.collection("users").doc(user_id)
      userRef.update({
        flags: firebase.firestore.FieldValue.increment(1),
      })
    })
    .then(() => {
      Alert.alert("Updated")
    })
    .catch((error) => {
      Alert.alert(error)
    })
}
