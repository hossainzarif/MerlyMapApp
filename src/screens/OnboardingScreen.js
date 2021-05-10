import React from 'react'
import Onboarding from 'react-native-onboarding-swiper'
import { View, Image, StyleSheet } from 'react-native'
import colors from '../../assets/data/colors'

const OnboardingScreen = ({ navigation }) => {
  return (
    <Onboarding
      onDone={() => {}}
      pages={[
        {
          backgroundColor: colors.primary,
          image: <Image source={require('../../assets/onboarding-img1.png')} />,
          title: 'Onboarding-1',
          subtitle:
            'Done with React Native Onboarding Swiper Done with React Native Onboarding Swiper Done with React Native Onboarding Swiper Done with React Native Onboarding Swiper',
        },
        {
          backgroundColor: colors.primary,
          image: <Image source={require('../../assets/onboarding-img3.png')} />,
          title: 'Onboarding-2',
          subtitle:
            'Done with React Native Onboarding Swiper Done with React Native Onboarding Swiper Done with React Native Onboarding Swiper Done with React Native Onboarding Swiper',
        },
      ]}
    />
  )
}

export default OnboardingScreen
