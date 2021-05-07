import React from 'react'
import { Text, StyleSheet, View, TextInput, SafeAreaView } from 'react-native'
import CurvedButton from '../components/Buttons/CurvedButton'
import colors from '../../assets/data/colors'
import { Input } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons'
import color from 'color'
const loginScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>WELCOME!</Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.action}>
          <Input
            rightIcon={
              <AntDesign name='rightcircle' size={20} color={colors.primary} />
            }
            leftIcon={
              <AntDesign name='rightcircle' size={20} color={colors.primary} />
            }
            inputStyle={{ paddingLeft: 5 }}
            containerStyle={styles.textInput}
            inputContainerStyle={{ borderBottomWidth: 0 }}
          />
        </View>

        <View style={styles.buttoncontainer}>
          <CurvedButton btnText='LOGIN!'></CurvedButton>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  buttoncontainer: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  footer: {
    flex: 2.5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: 'center',
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 28,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  input: {
    height: 40,
    margin: 12,
    width: '100%',
    borderWidth: 1,
    borderRadius: 15,
    borderColor: colors.primary,
    backgroundColor: colors.primary_fade,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    borderWidth: 1,
    width: '100%',
    margin: 12,
    height: 47,
    borderRadius: 15,
    borderColor: colors.primary,
    backgroundColor: colors.primary_fade,
  },
})

export default loginScreen
