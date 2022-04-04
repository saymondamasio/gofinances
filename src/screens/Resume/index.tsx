import AsyncStorage from '@react-native-async-storage/async-storage'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { useFocusEffect } from '@react-navigation/native'
import { addMonths, format, subMonths } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import React, { useCallback, useState } from 'react'
import { ActivityIndicator } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { useTheme } from 'styled-components/native'
import { VictoryPie } from 'victory-native'
import { HistoryCard } from '../../components/HistoryCard'
import { categories } from '../../utils/categories'
import { formatCurrency } from '../../utils/formatCurrency'
import { LoadContainer } from '../Dashboard/styles'
import {
  ChartContainer,
  Container,
  Content,
  Header,
  Month,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Title,
} from './styles'

interface TransactionData {
  type: 'positive' | 'negative'
  name: string
  amount: string
  amountFormatted: string
  category: string
  date: string
  dateFormatted: string
}

interface CategoryData {
  key: string
  name: string
  total: number
  totalFormatted: string
  color: string
  percent: string
}

export function Resume() {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([])

  const theme = useTheme()

  useFocusEffect(
    useCallback(() => {
      loadData()
    }, [selectedDate])
  )

  function handleDataChange(action: 'next' | 'prev') {
    if (action === 'next') {
      setSelectedDate(addMonths(selectedDate, 1))
    } else {
      setSelectedDate(subMonths(selectedDate, 1))
    }
  }

  async function loadData() {
    setIsLoading(true)

    const dataKey = '@gofinances:transactions'

    const rawData = await AsyncStorage.getItem(dataKey)
    const data: TransactionData[] = rawData ? JSON.parse(rawData) : []

    const expansives = data
      .filter(item => item.type === 'negative')
      .filter(
        item =>
          new Date(item.date).getMonth() === selectedDate.getMonth() &&
          new Date(item.date).getFullYear() === selectedDate.getFullYear()
      )

    const expansiveTotal = expansives.reduce(
      (acc, current) => (acc += Number(current.amount)),
      0
    )

    const totalByCategory: CategoryData[] = []

    categories.forEach(category => {
      let categorySum = 0

      expansives.forEach(item => {
        if (item.category === category.key) categorySum += Number(item.amount)
      })

      if (categorySum > 0)
        totalByCategory.push({
          key: category.key,
          name: category.name,
          total: categorySum,
          totalFormatted: formatCurrency(categorySum),
          color: category.color,
          percent: `${((categorySum / expansiveTotal) * 100).toFixed(0)}%`,
        })
    })

    setTotalByCategories(totalByCategory)

    setIsLoading(false)
  }

  return (
    <Container>
      <Header>
        <Title>Resumo</Title>
      </Header>
      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadContainer>
      ) : (
        <Content
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingBottom: useBottomTabBarHeight(),
          }}
        >
          <ChartContainer>
            <MonthSelect>
              <MonthSelectButton onPress={() => handleDataChange('prev')}>
                <MonthSelectIcon name="chevron-left" />
              </MonthSelectButton>

              <Month>
                {format(selectedDate, 'MMMM, yyyy', { locale: ptBR })}
              </Month>

              <MonthSelectButton onPress={() => handleDataChange('next')}>
                <MonthSelectIcon name="chevron-right" />
              </MonthSelectButton>
            </MonthSelect>

            <VictoryPie
              data={totalByCategories}
              colorScale={totalByCategories.map(
                totalByCategory => totalByCategory.color
              )}
              x="percent"
              y="total"
              style={{
                labels: {
                  fontSize: RFValue(18),
                  fontWeight: 'bold',
                  fill: theme.colors.shape,
                },
              }}
              labelRadius={50}
            />
          </ChartContainer>

          {totalByCategories.map(totalByCategory => (
            <HistoryCard
              key={totalByCategory.key}
              amount={totalByCategory.totalFormatted}
              color={totalByCategory.color}
              title={totalByCategory.name}
            />
          ))}
        </Content>
      )}
    </Container>
  )
}
