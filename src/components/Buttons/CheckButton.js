import React from 'react'
import { CheckBox } from 'react-native-elements'
import colors from '../../../assets/data/colors'

const CheckButton = () => {
  return <CheckBox checkedColor={colors.primary_dark} checked={true} />
}

export default CheckButton
