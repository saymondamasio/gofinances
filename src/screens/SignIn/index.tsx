import React, { useState } from 'react'
import { ActivityIndicator, Alert, Platform } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { useTheme } from 'styled-components'
import AppleIcon from '../../assets/apple.svg'
import GoogleIcon from '../../assets/google.svg'
import Logo from '../../assets/logo.svg'
import { SignInSocialButton } from '../../components/SignInSocialButton'
import { useAuth } from '../../hooks/auth'
import {
  Container,
  Footer,
  FooterWrapper,
  Header,
  SignInTitle,
  Title,
  TitleWrapper,
} from './styles'

export function SignIn() {
  const { signInWithGoogle, signInWithApple } = useAuth()

  const theme = useTheme()

  const [isLoading, setIsLoading] = useState(false)

  async function handleSignInWithGoogle() {
    setIsLoading(true)
    try {
      await signInWithGoogle()
    } catch (error) {
      setIsLoading(false)
      console.log(`SignIn -  ${error}`)

      Alert.alert('Não foi possível conectar a conta Google')
    }
  }

  async function handleSignInWithApple() {
    setIsLoading(true)
    try {
      await signInWithApple()
    } catch (error) {
      setIsLoading(false)
      console.log(`SignIn -  ${error}`)

      Alert.alert('Não foi possível conectar a conta Google')
    }
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <Logo width={RFValue(170)} height={RFValue(34)} />
          <Title>
            Controle suas{'\n'}finanças de forma{'\n'}muito simples
          </Title>
        </TitleWrapper>

        <SignInTitle>
          Faça seu login com{'\n'}umas das contas abaixo
        </SignInTitle>
      </Header>

      <Footer>
        <FooterWrapper>
          <SignInSocialButton
            svg={GoogleIcon}
            title="Entrar com Google"
            onPress={handleSignInWithGoogle}
          />
          {Platform.OS === 'ios' && (
            <SignInSocialButton
              svg={AppleIcon}
              title="Entrar com Apple"
              onPress={handleSignInWithApple}
            />
          )}
        </FooterWrapper>

        {isLoading && (
          <ActivityIndicator
            color={theme.colors.shape}
            style={{ marginTop: 18 }}
          />
        )}
      </Footer>
    </Container>
  )
}
