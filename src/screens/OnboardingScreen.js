import React from 'react'
import Onboarding from 'react-native-onboarding-swiper'
import { View, Image, StyleSheet } from 'react-native'
import colors from '../../assets/data/colors'
import { ONBOARDING_1, ONBOARDING_2 } from '../constants/stringsConstants'
const OnboardingScreen = ({ navigation }) => {
  return (
    <Onboarding
      onDone={() => {
        navigation.replace('WelcomeScreen')
      }}
      onSkip={() => {
        navigation.replace('WelcomeScreen')
      }}
      pages={[
        {
          backgroundColor: colors.primary,
          image: <Image source={require('../../assets/onboarding-img1.png')} />,
          title: 'Onboarding-1',
          subtitle: ONBOARDING_1,
        },
        {
          backgroundColor: colors.primary,
          image: <Image source={require('../../assets/map-1.png')} />,
          title: 'Onboarding-2',
          subtitle: ONBOARDING_2,
        },
      ]}
    />
  )
}

export default OnboardingScreen
