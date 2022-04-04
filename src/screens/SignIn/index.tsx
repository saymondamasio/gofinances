import React from 'react'
import { Alert } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
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

  async function handleSignInWithGoogle() {
    try {
      await signInWithGoogle()
    } catch (error) {
      console.log(`SignIn -  ${error}`)

      Alert.alert('Não foi possível conectar a conta Google')
    }
  }

  async function handleSignInWithApple() {
    try {
      await signInWithApple()
    } catch (error) {
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
          <SignInSocialButton
            svg={AppleIcon}
            title="Entrar com Apple"
            onPress={handleSignInWithApple}
          />
        </FooterWrapper>
      </Footer>
    </Container>
  )
}
