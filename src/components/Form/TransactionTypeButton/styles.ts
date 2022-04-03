import { Feather } from '@expo/vector-icons'
import { RectButton } from 'react-native-gesture-handler'
import { RFValue } from 'react-native-responsive-fontsize'
import styled, { css } from 'styled-components/native'

interface ContainerProps {
  isActive: boolean
  type: 'positive' | 'negative'
}

interface IconProps {
  type: 'positive' | 'negative'
}

export const Container = styled.View<ContainerProps>`
  width: 48%;

  border-width: 1.5px;
  border-color: ${({ theme }) => theme.colors.text};

  ${({ type, isActive }) =>
    isActive &&
    type === 'positive' &&
    css`
      background-color: ${({ theme }) => theme.colors.success_light};
      border-width: 0;
    `}

  ${({ type, isActive }) =>
    isActive &&
    type === 'negative' &&
    css`
      background-color: ${({ theme }) => theme.colors.attention_light};
      border-width: 0;
    `}
  border-radius: 5px;
`

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`

export const Icon = styled(Feather)<IconProps>`
  font-size: ${RFValue(24)}px;
  margin-right: 12px;

  color: ${({ theme, type }) =>
    type === 'positive' ? theme.colors.success : theme.colors.attention};
`

export const Button = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  justify-content: center;

  padding: 16px;
`
