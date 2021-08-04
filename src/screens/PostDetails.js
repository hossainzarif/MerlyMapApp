import React, { useContext, useState } from 'react'
import {
  View,
  ScrollView,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Switch,
  TouchableWithoutFeedback,
} from 'react-native'
import colors from '../../assets/data/colors'
import {
  Card,
  ListItem,
  Button,
  Icon,
  ButtonGroup,
} from 'react-native-elements'
import DateCard from '../cards/DateCard'
import { SliderBox } from 'react-native-image-slider-box'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { FAB } from 'react-native-paper'
import { AuthContext } from '../Providers/AuthProvider'
import { TouchableOpacity } from 'react-native-gesture-handler'
import openMap from 'react-native-open-maps'
import OpenMap from 'react-native-open-map'
import { FlagPost, updateAvailability } from '../Providers/FirebaseFunc'
import Loading from '../custom/Loading'
import { RadioButton } from 'react-native-paper'
import { color } from 'react-native-elements/dist/helpers'
import { Modal } from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer'
import ModalPrivacy from '../components/modals/ModalPrivacy'
import DateValidCard from '../cards/DateValidCard'
import { AntDesign, FontAwesome, Entypo } from '@expo/vector-icons'
const PostDetails = ({ route, navigation }) => {
  const {
    address,
    dates,
    details,
    images,
    user_id,
    name,
    coord,
    post_id,
    available,
    title,
  } = route.params
  const { user } = useContext(AuthContext)

  const [flagLoading, setflagLoading] = useState(false)
  const [visible, setvisible] = useState(false)
  // function _goToYosemite() {}
  const [isEnabled, setIsEnabled] = useState(available)
  const [fullImage, setfullImage] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedIndex, setselectedIndex] = useState(0)
  const img = [
    {
      url: 'https://firebasestorage.googleapis.com/v0/b/garage-sales-map.appspot.com/o/images%2FpostImages%2F2b78b551-2865-47c9-b1a9-a4e6a0e7998f.jpg-Tue%20Jul%2006%202021%2014%3A37%3A29%20GMT%2B0600?alt=media&token=ab92f660-c070-48ab-808d-2ab966a87eed',
    },
    {
      url: 'https://firebasestorage.googleapis.com/v0/b/garage-sales-map.appspot.com/o/images%2FpostImages%2F2c62a776-74cf-4fdd-8589-7b822443a9e6.jpg-Tue%20Jul%2006%202021%2014%3A37%3A29%20GMT%2B0600?alt=media&token=bb0bf0e1-21cc-43f8-9ac2-d752d12febae',
    },
  ]
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState)

    if (isEnabled) {
      updateAvailability(post_id, false)
    } else {
      updateAvailability(post_id, true)
    }
  }
  const component2 = () => (
    <FontAwesome name='envelope' size={24} color='white' />
  )
  const component3 = () => (
    <Entypo name='location-pin' size={24} color='white' />
  )
  const component4 = () => <FontAwesome name='flag' size={24} color='white' />

  const buttons = [
    { element: component2 },
    { element: component3 },
    { element: component4 },
  ]

  function updateIndex(selectedIndex) {
    setselectedIndex(selectedIndex)
    if (selectedIndex == 0) {
      console.log('Love')
    } else if (selectedIndex == 1) {
      navigation.navigate('Chat', {
        seller_name: name,
        seller_id: user_id,
      })
    } else if (selectedIndex == 2) {
      OpenMap.show({
        latitude: coord.latitude,
        longitude: coord.longitude,
      })
    } else if (selectedIndex == 3) {
      setModalVisible(true)
    }
  }

  const _renderHeader = () => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          setvisible(false)
        }}
      >
        <View
          style={{
            height: 40,
            justifyContent: 'center',
            alignItems: 'flex-end',
            padding: 20,
          }}
        >
          <Text style={{ fontSize: 17, color: 'white' }}>Exit</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  if (flagLoading) {
    return <Loading />
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
          <View style={styles.sections}>
            <Text style={styles.headerText}>
              Location (tap to open in maps)
            </Text>

            <TouchableOpacity
              onPress={() => {
                OpenMap.show({
                  latitude: coord.latitude,
                  longitude: coord.longitude,
                })
              }}
            >
              <Card containerStyle={styles.cardStyle}>
                <Text style={styles.locationText}>{address}</Text>
              </Card>
            </TouchableOpacity>
          </View>
          <View style={styles.sections}>
            <Text style={styles.headerText}>Dates</Text>

            <FlatList
              data={dates}
              renderItem={({ item }) => (
                <DateValidCard time={item} showbutton={false} />
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>

          <View style={styles.sections}>
            <Text style={[styles.headerText, { marginBottom: 10 }]}>
              Photos
            </Text>

            {images ? (
              <SliderBox
                images={images}
                dotColor={colors.primary}
                paginationBoxVerticalPadding={10}
                circleLoop
                resizeMethod={'resize'}
                resizeMode={'contain'}
                paginationBoxStyle={{
                  alignItems: 'center',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  paddingVertical: 10,
                }}
                ImageComponentStyle={{
                  borderRadius: 15,
                  backgroundColor: 'white',
                  alignSelf: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 10,
                  marginRight: 30,
                }}
                imageLoadingColor={colors.primary}
                onCurrentImagePressed={(index) => {
                  let temp = []
                  images.forEach((element) => {
                    temp.push({ url: element })
                  })
                  setfullImage(temp)
                  setvisible(true)
                  console.log(fullImage)
                }}
              />
            ) : (
              <Card containerStyle={styles.cardStyle}>
                <Card.Image
                  source={require('../../assets/unav.png')}
                  style={{ resizeMode: 'contain' }}
                ></Card.Image>
              </Card>
            )}
          </View>
          {images ? (
            <Modal visible={visible} transparent={true}>
              <ImageViewer
                onCancel={() => {
                  setvisible(false)
                }}
                onSwipeDown={() => {
                  setvisible(false)
                }}
                // onClick={() => {
                //   setvisible(false)
                // }}
                imageUrls={fullImage}
                enableSwipeDown={true}
                renderHeader={_renderHeader}
                backgroundColor={colors.primary_back}
              />
            </Modal>
          ) : null}

          <View style={styles.sections}>
            <Text style={styles.headerText}>Details</Text>

            <Card containerStyle={styles.cardStyle}>
              <Text style={styles.locationText}>{details}</Text>
            </Card>
          </View>

          {user_id == user.uid ? (
            <View
              style={{
                justifyContent: 'flex-end',
                alignItems: 'center',
                width: '85%',
                paddingBottom: 20,
                paddingTop: 10,
                flexDirection: 'row',
              }}
            >
              <FAB
                style={styles.fab}
                large
                icon='circle-edit-outline'
                color={colors.white}
                onPress={() => {
                  navigation.navigate('Edit', {
                    post_id: post_id,
                    seller_id: user_id,
                    address: address,
                    dates: dates,
                    details: details,
                    images_passed: images ? images : [],
                    name: name,
                    title: title,
                  })
                }}
              />
            </View>
          ) : (
            <View style={{ width: '90%' }}>
              <ButtonGroup
                buttons={buttons}
                onPress={updateIndex}
                // selectedIndex={selectedIndex}
                containerStyle={{
                  height: 50,
                  marginBottom: 20,
                  elevation: 10,
                  borderRadius: 10,
                  backgroundColor: colors.primary,
                }}
                underlayColor={colors.white}

                // selectedButtonStyle={{ backgroundColor: colors.darkGray }}
              />
            </View>
          )}
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <ModalPrivacy
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              post_id={post_id}
              user_id={user_id}
              setflagLoading={setflagLoading}
              flagger={user.uid}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.darkGray,
  },

  userBtnTxt: {
    color: colors.primary,
  },
  locationText: { textAlign: 'justify', fontSize: 15 },
  cardStyle: {
    borderRadius: 10,
    elevation: 2,
    marginBottom: 5,
  },
  sections: {
    width: '90%',
    marginTop: 10,
    marginBottom: 10,
  },
  fab: {
    backgroundColor: colors.primary,
  },
  fab_2: {
    backgroundColor: colors.flag,
  },
  checkedText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.darkGray,
  },
})

export default PostDetails
