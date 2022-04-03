import React from 'react'
import { HighlightCard } from '../../components/HighlightCard'
import {
  ITransactionCardProps,
  TransactionCard,
} from '../../components/TransactionCard'
import {
  Container,
  Header,
  HighlightCards,
  Icon,
  LogoutButton,
  Photo,
  Title,
  Transactions,
  TransactionsList,
  User,
  UserGreeting,
  UserInfo,
  UserInfoWrapper,
  UserName,
} from './styles'

export interface IDataListProps extends ITransactionCardProps {
  id: string
}

export function Dashboard() {
  const data: IDataListProps[] = [
    {
      id: '10',
      type: 'positive',
      title: 'Desenvolvimento de site 1',
      amount: 'R$ 1.400,00',
      category: {
        name: 'Compras',
        icon: 'dollar-sign',
      },
      date: '01/04/2020',
    },
    {
      id: '5',
      type: 'positive',
      title: 'Desenvolvimento de site 2',
      amount: 'R$ 1.400,00',
      category: {
        name: 'Compras',
        icon: 'dollar-sign',
      },
      date: '01/04/2020',
    },
    {
      id: '3',
      type: 'positive',
      title: 'Desenvolvimento de site 3 ',
      amount: 'R$ 1.400,00',
      category: {
        name: 'Compras',
        icon: 'dollar-sign',
      },
      date: '01/04/2020',
    },
    {
      id: '2',
      type: 'negative',
      title: 'Desenvolvimento de site 4',
      amount: 'R$ 1.400,00',
      category: {
        name: 'Compras',
        icon: 'dollar-sign',
      },
      date: '01/04/2020',
    },
  ]
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

          <LogoutButton>
            <Icon name="power" />
          </LogoutButton>
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

      <Transactions>
        <Title>Listagem</Title>

        <TransactionsList
          data={data}
          keyExtractor={({ title }) => title}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  )
}
