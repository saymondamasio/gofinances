import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { ActivityIndicator } from 'react-native'
import { useTheme } from 'styled-components'
import { HighlightCard } from '../../components/HighlightCard'
import {
  ITransactionCardProps,
  TransactionCard,
} from '../../components/TransactionCard'
import { useAuth } from '../../hooks/auth'
import { formatCurrency } from '../../utils/formatCurrency'
import {
  Container,
  Header,
  HighlightCards,
  Icon,
  LoadContainer,
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

interface IHighlightProps {
  amount: string
  lastTransaction: string
}

interface IHighlightData {
  entries: IHighlightProps
  expensive: IHighlightProps
  total: IHighlightProps
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true)

  const { signOut, user } = useAuth()

  const theme = useTheme()

  const [transactions, setTransactions] = useState<IDataListProps[]>([])
  const dataKey = `@gofinances:transactions_user:${user.id}`

  const [highlightData, setHighlightData] = useState<IHighlightData>(
    {} as IHighlightData
  )

  let entriesTotal = 0
  let expensiveTotal = 0

  function getLastTransactionDate(
    collection: IDataListProps[],
    type: 'positive' | 'negative'
  ) {
    const lastTransaction = new Date(
      Math.max.apply(
        Math,
        collection
          .filter(transaction => transaction.type === type)
          .map(transaction => new Date(transaction.date).getTime())
      )
    )

    const todayYear = new Date().getFullYear()

    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleDateString(
      'pt-BR',
      {
        month: 'long',
      }
    )} ${
      todayYear !== lastTransaction.getFullYear()
        ? `${lastTransaction.getFullYear}`
        : ''
    }`
  }

  function getTotalIntervalTransactionDate(collection: IDataListProps[]) {
    const lastTransaction = new Date(
      Math.max.apply(
        Math,
        collection.map(transaction => new Date(transaction.date).getTime())
      )
    )

    const lastTransactionFormatted = lastTransaction.toLocaleDateString(
      'pt-BR',
      {
        day: '2-digit',
        month: 'long',
      }
    )

    const firstTransaction = new Date(
      Math.min.apply(
        Math,
        collection.map(transaction => new Date(transaction.date).getTime())
      )
    )

    const firstTransactionFormatted = firstTransaction.toLocaleDateString(
      'pt-BR',
      {
        day: '2-digit',
        month: 'long',
      }
    )

    return firstTransaction.getFullYear() === lastTransaction.getFullYear()
      ? `${firstTransactionFormatted} ~ ${lastTransactionFormatted}`
      : `${firstTransactionFormatted}, ${firstTransaction.getFullYear()} ~ ${lastTransactionFormatted}, ${lastTransaction.getFullYear()}`
  }

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

      if (transaction.type === 'positive') {
        entriesTotal += Number(transaction.amount)
      }
      if (transaction.type === 'negative') {
        expensiveTotal += Number(transaction.amount)
      }

      return {
        ...transaction,
        amountFormatted,
        dateFormatted,
      }
    })

    setTransactions(transactionsFormatted)

    const lastTransactionEntries = getLastTransactionDate(
      transactions,
      'positive'
    )
    const lastTransactionExpensive = getLastTransactionDate(
      transactions,
      'negative'
    )

    const totalInterval = getTotalIntervalTransactionDate(transactions)

    const total = entriesTotal - expensiveTotal

    setHighlightData({
      expensive: {
        amount: formatCurrency(expensiveTotal),
        lastTransaction:
          expensiveTotal > 0
            ? `Última saída dia ${lastTransactionExpensive}`
            : '',
      },
      entries: {
        amount: formatCurrency(entriesTotal),
        lastTransaction:
          entriesTotal > 0
            ? `Última entrada dia ${lastTransactionEntries}`
            : '',
      },
      total: {
        amount: formatCurrency(total),
        lastTransaction: totalInterval,
      },
    })

    setIsLoading(false)
  }

  useFocusEffect(
    useCallback(() => {
      loadTransactions()
    }, [])
  )

  return (
    <Container>
      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadContainer>
      ) : (
        <>
          <Header>
            <UserInfoWrapper>
              <UserInfo>
                <Photo source={{ uri: user.photo }} />

                <User>
                  <UserGreeting>Olá,</UserGreeting>
                  <UserName>{user.name}</UserName>
                </User>
              </UserInfo>

              <LogoutButton onPress={signOut}>
                <Icon name="power" />
              </LogoutButton>
            </UserInfoWrapper>
          </Header>
          <HighlightCards>
            <HighlightCard
              title="Entradas"
              amount={highlightData.entries?.amount}
              lastTransaction={highlightData.entries?.lastTransaction}
              type="up"
            />
            <HighlightCard
              title="Saídas"
              amount={highlightData.expensive?.amount}
              lastTransaction={highlightData.expensive?.lastTransaction}
              type="down"
            />
            <HighlightCard
              title="Total"
              amount={highlightData.total?.amount}
              lastTransaction={highlightData.total?.lastTransaction}
              type="total"
            />
          </HighlightCards>

          <Transactions>
            <Title>Listagem</Title>

            <TransactionsList
              data={transactions}
              keyExtractor={({ id }) => id}
              renderItem={({ item }) => <TransactionCard data={item} />}
            />
          </Transactions>
        </>
      )}
    </Container>
  )
}
