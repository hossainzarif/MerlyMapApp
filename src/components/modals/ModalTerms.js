import React from 'react'
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
import { TERMS } from '../../constants/stringsConstants'
const ModalTerms = (props) => {
  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={props.modalVisible_terms}
    >
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
                Terms of Service
              </Text>
            </View>

            <View>
              <TouchableOpacity
                onPress={() => {
                  props.setModalVisible_terms(false)
                }}
              >
                <Entypo name='cross' size={32} color='green' />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.modalText}>{TERMS}</Text>
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

export default ModalTerms
