import { NavigationContainer } from '@react-navigation/native'
import AppLoading from 'expo-app-loading'
import React from 'react'
import { useAuth } from '../hooks/auth'
import { AppRoutes } from './app.routes'
import { AuthRoutes } from './auth.routes'

export function Routes() {
  const { user, userStorageLoading } = useAuth()

  if (userStorageLoading) return <AppLoading />

  return (
    <NavigationContainer>
      {user.id ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  )
}
