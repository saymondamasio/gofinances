import React from 'react'
import { HighlightCard } from '../../components/HighlightCard'
import {
  Container,
  Header,
  HighlightCards,
  Icon,
  Photo,
  User,
  UserGreeting,
  UserInfo,
  UserInfoWrapper,
  UserName,
} from './styles'

export function Dashboard() {
  return (
    <Container>
      <Header>
        <UserInfoWrapper>
          <UserInfo>
            <Photo source={{ uri: 'https://github.com/saymondamasio.png' }} />

            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Saymon</UserName>
            </User>
          </UserInfo>

          <Icon name="power" />
        </UserInfoWrapper>
      </Header>
      <HighlightCards>
        <HighlightCard
          title="Entradas"
          amount="R$ 17.400,00"
          lastTransaction="Última entrada dia 13 de abril"
          type="up"
        />
        <HighlightCard
          title="Saídas"
          amount="R$ 1.400,00"
          lastTransaction="Última saída dia 04 de abril"
          type="down"
        />
        <HighlightCard
          title="Total"
          amount="R$ 5.400,00"
          lastTransaction="01 á 16 de abril"
          type="total"
        />
      </HighlightCards>
    </Container>
  )
}
