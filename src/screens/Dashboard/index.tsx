import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
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
  const [data, setData] = useState<IDataListProps[]>([])
  const dataKey = '@gofinances:transactions'

  async function loadTransactions() {
    const dataRaw = await AsyncStorage.getItem(dataKey)

    const transactions: IDataListProps[] = dataRaw ? JSON.parse(dataRaw) : []

    const transactionsFormatted = transactions.map(transaction => {
      const amountFormatted = Number(transaction.amount).toLocaleString(
        'pt-BR',
        {
          style: 'currency',
          currency: 'BRL',
        }
      )

      const dateFormatted = Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
      }).format(new Date(transaction.date))

      return {
        ...transaction,
        amountFormatted,
        dateFormatted,
      }
    })

    setData(transactionsFormatted)
  }

  useFocusEffect(
    useCallback(() => {
      loadTransactions()
    }, [])
  )

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
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  )
}
