import React from 'react'
import { AuthProvider } from '../Providers/AuthProvider'
import RootNav from './RootNav'

const Navigations = () => {
  return (
    <AuthProvider>
      <RootNav />
    </AuthProvider>
  )
}

export default Navigations
