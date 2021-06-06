import "firebase/firestore"
import * as firebase from "firebase"
import { Alert } from "react-native"

export function addPost(
  allLocation,
  titlePost,
  dateTimeArray,
  DetailsText,
  fileDownloadUrls,
  uid,
  setIsLoading,
  setdateTimearr,
  setallLocation
) {
  setIsLoading(true)
  firebase
    .firestore()
    .collection("posts")
    .add({
      location: allLocation,
      title: titlePost,
      dates: dateTimeArray,
      details: DetailsText,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      pictures: fileDownloadUrls,
      user: uid,
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
