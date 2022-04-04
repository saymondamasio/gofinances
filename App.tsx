import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
  useFonts,
} from '@expo-google-fonts/poppins'
import { NavigationContainer } from '@react-navigation/native'
import AppLoading from 'expo-app-loading'
import { StatusBar } from 'expo-status-bar'
import 'intl'
import 'intl/locale-data/jsonp/pt-BR'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { ThemeProvider } from 'styled-components/native'
import { AuthProvider } from './src/contexts/AuthContext'
import theme from './src/global/styles/theme'
import { SignIn } from './src/screens/SignIn'

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="light" translucent backgroundColor="transparent" />
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <AuthProvider>
            <SignIn />
          </AuthProvider>
        </NavigationContainer>
      </ThemeProvider>
    </GestureHandlerRootView>
  )
}
