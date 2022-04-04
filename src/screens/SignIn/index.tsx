import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import AppleIcon from '../../assets/apple.svg'
import GoogleIcon from '../../assets/google.svg'
import Logo from '../../assets/logo.svg'
import { SignInSocialButton } from '../../components/SignInSocialButton'
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
          <SignInSocialButton svg={GoogleIcon} title="Entrar com Google" />
          <SignInSocialButton svg={AppleIcon} title="Entrar" />
        </FooterWrapper>
      </Footer>
    </Container>
  )
}
