import React from 'react'
import { TouchableOpacityProps } from 'react-native'
import { Category, Container, Icon } from './styles'

interface Props extends TouchableOpacityProps {
  title: string
  onPress: () => void
}

export function CategorySelectButton({ title, onPress }: Props) {
  return (
    <Container onPress={onPress}>
      <Category>{title}</Category>
      <Icon name="chevron-down" />
    </Container>
  )
}
