import { Feather } from '@expo/vector-icons'
import Constants from 'expo-constants'
import { FlatList, FlatListProps } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'
import { IDataListProps } from '.'

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`

export const Header = styled.View`
  width: 100%;
  height: ${RFPercentage(42)}px;

  background-color: ${({ theme }) => theme.colors.primary};

  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
`
export const UserInfoWrapper = styled.View`
  width: 100%;

  padding: 0 24px;
  margin-top: ${RFValue(Constants.statusBarHeight)}px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`

export const Photo = styled.Image`
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;

  border-radius: 10px;
`

export const User = styled.View`
  margin-left: 17px;
`

export const UserGreeting = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
`

export const UserName = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(18)}px;
`

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${RFValue(24)}px;
` as unknown as typeof Feather

export const HighlightCards = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: { paddingHorizontal: 24 },
})`
  width: 100%;
  position: absolute;
  margin-top: ${RFPercentage(20)}px;
`

export const Transactions = styled.View`
  flex: 1;

  padding: 0 24px;

  margin-top: ${RFPercentage(12)}px;
`

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.text_dark};

  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};

  margin-bottom: 16px;
`

export const TransactionsList = styled(
  FlatList as new (
    props: FlatListProps<IDataListProps>
  ) => FlatList<IDataListProps>
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace(),
  },
})``

export const LogoutButton = styled(BorderlessButton)``

export const LoadContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`
