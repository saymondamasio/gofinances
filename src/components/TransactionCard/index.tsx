import React from 'react'
import { categories } from '../../utils/categories'
import {
  Amount,
  Category,
  CategoryName,
  Container,
  Date,
  Footer,
  Icon,
  Title,
} from './styles'

export interface ITransactionCardProps {
  type: 'positive' | 'negative'
  name: string
  amount: string
  amountFormatted: string
  category: string
  date: string
  dateFormatted: string
}

interface IProps {
  data: ITransactionCardProps
}

export function TransactionCard({
  data: { amountFormatted, category, name, dateFormatted, type },
}: IProps) {
  const categoryItem = categories.find(item => item.key === category)!
  return (
    <Container>
      <Title>{name}</Title>

      <Amount type={type}>
        {type === 'negative' && '- '}
        {amountFormatted}
      </Amount>

      <Footer>
        <Category>
          <Icon name={categoryItem.icon} />

          <CategoryName>{categoryItem.name}</CategoryName>
        </Category>

        <Date>{dateFormatted}</Date>
      </Footer>
    </Container>
  )
}
