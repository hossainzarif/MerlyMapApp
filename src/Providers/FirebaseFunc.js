import "firebase/firestore"
import * as firebase from "firebase"
import { Alert } from "react-native"

export function addPost() {
  firebase.firestore().collection("posts").addPost({})
}

// export function addBooking(date, user, isLoading) {
//   const docDate = String(moment(date).format('LL'))
//   const storeDate = String(moment(date).format('L'))
//   isLoading(true)
//   firebase
//     .firestore()
//     .collection('users')
//     .doc(user)
//     .collection('dates')
//     .doc(docDate)
//     .set({
//       Bookingdate: storeDate,
//     })
//     .then(() => {
//       firebase
//         .firestore()
//         .collection('Bookings')
//         .doc(docDate)
//         .collection('users')
//         .doc(user)
//         .set({
//           user: user,
//         })
//         .then(() => {
//           isLoading(false)
//           Alert.alert('Ihre Buchung war erfolgreich')
//         })
//         .catch((error) => {
//           alert(error)
//         })
//     })
//     .catch((error) => {
//       alert(error)
//     })
// }
