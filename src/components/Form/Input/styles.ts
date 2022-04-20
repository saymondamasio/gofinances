import { RFValue } from 'react-native-responsive-fontsize'
import styled, { css } from 'styled-components/native'

interface Props {
  active?: boolean
}

export const Container = styled.TextInput<Props>`
  width: 100%;
  padding: 18px;

  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text_dark};

  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 5px;

  ${({ theme, active }) =>
    active &&
    css`
      border-width: 3px;
      border-color: ${theme.colors.attention};
    `}

  margin-bottom: 8px;
`
