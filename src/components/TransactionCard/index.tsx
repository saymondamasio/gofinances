import React from 'react'
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

interface ICategoryType {
  name: string
  icon: string
}

export interface ITransactionCardProps {
  type: 'positive' | 'negative'
  title: string
  amount: string
  category: ICategoryType
  date: string
}

interface IProps {
  data: ITransactionCardProps
}

export function TransactionCard({
  data: { amount, category, title, date, type },
}: IProps) {
  return (
    <Container>
      <Title>{title}</Title>

      <Amount type={type}>
        {type === 'negative' && '- '}
        {amount}
      </Amount>

      <Footer>
        <Category>
          <Icon name={category.icon} />

          <CategoryName>{category.name}</CategoryName>
        </Category>

        <Date>{date}</Date>
      </Footer>
    </Container>
  )
}
