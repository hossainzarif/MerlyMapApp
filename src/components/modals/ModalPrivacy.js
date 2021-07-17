import React, { useState, useContext } from 'react'
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { Picker } from '@react-native-picker/picker'
import DetailsInputTaker from '../inputs/DetailsInputTaker'
import colors from '../../../assets/data/colors'
import CurvedButton from '../buttons/CurvedButton'
import { FlagPost } from '../../Providers/FirebaseFunc'
const ModalPrivacy = (props) => {
  const [selectedLanguage, setSelectedLanguage] = useState('Wrong Location')
  const [commentText, setCommentText] = useState('')
  const { post_id, user_id, setflagLoading, flagger } = props

  return (
    <Modal animationType='fade' transparent={true} visible={props.modalVisible}>
      <View style={styles.centeredView}>
        <ScrollView contentContainerStyle={styles.modalView}>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'space-around',
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                }}
              >
                Reason for flagging
              </Text>
            </View>

            <View>
              <TouchableOpacity
                onPress={() => {
                  props.setModalVisible(false)
                }}
              >
                <Entypo name='cross' size={32} color='green' />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              height: 50,
              width: 250,
              margin: 10,
              borderWidth: 2,
              borderColor: colors.primary,
              justifyContent: 'center',
              margin: 10,
              borderRadius: 10,
            }}
          >
            <Picker
              style={{
                height: 50,
                width: 250,
              }}
              selectedValue={selectedLanguage}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedLanguage(itemValue)
              }
            >
              <Picker.Item label='Wrong location' value='Wrong location' />
              <Picker.Item label='Wrong date' value='Wrong date' />
              <Picker.Item label='Others' value='Others' />
            </Picker>
          </View>
          <Text
            style={{
              textAlign: 'left',
              width: '100%',
              fontSize: 20,
              fontWeight: 'bold',
              paddingTop: 10,
              paddingBottom: 10,
            }}
          >
            Comments
          </Text>
          <DetailsInputTaker
            onChangeText={function (currentInput) {
              setCommentText(currentInput)
            }}
          />
          <View style={{ width: '100%', marginTop: 10 }}>
            <CurvedButton
              btnText='Confirm'
              onPress={() => {
                FlagPost(
                  post_id,
                  user_id,
                  setflagLoading,
                  flagger,
                  commentText,
                  selectedLanguage
                )
              }}
            />
          </View>
        </ScrollView>
      </View>
    </Modal>
  )
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    marginTop: 50,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    marginTop: 15,
    fontSize: 15,
    textAlign: 'justify',
  },
})

export default ModalPrivacy
