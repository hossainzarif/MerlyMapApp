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
          image: (
            <Image
              source={require('../../assets/on01.png')}
              resizeMode='contain'
            />
          ),
          title: 'Post a Sale',
          subtitle: ONBOARDING_1,
        },
        {
          backgroundColor: colors.primary,
          image: (
            <Image
              source={require('../../assets/on02.png')}
              resizeMode='contain'
            />
          ),
          title: 'Find Sales Near You',
          subtitle: ONBOARDING_2,
        },
        {
          backgroundColor: colors.primary,
          image: (
            <Image
              source={require('../../assets/on03.png')}
              resizeMode='contain'
            />
          ),
          title: 'Click on Addres to Start Navigation',
          subtitle: ONBOARDING_2,
        },
      ]}
    />
  )
}

export default OnboardingScreen
