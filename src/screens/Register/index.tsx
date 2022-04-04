import { yupResolver } from '@hookform/resolvers/yup'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native'
import uuid from 'react-native-uuid'
import * as Yup from 'yup'
import { Button } from '../../components/Form/Button'
import { CategorySelectButton } from '../../components/Form/CategorySelectButton'
import { InputForm } from '../../components/Form/InputForm'
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton'
import { useAuth } from '../../hooks/auth'
import { AppRoutesParamList } from '../../routes/app.routes'
import { CategorySelect } from '../CategorySelect'
import {
  Container,
  Fields,
  Form,
  Header,
  Title,
  TransactionsTypes,
} from './styles'

export type FormData = {
  name: string
  amount: number
}

type RegisterNavigationProps = BottomTabNavigationProp<
  AppRoutesParamList,
  'Cadastrar'
>

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  amount: Yup.number()
    .typeError('Informe um valor numérico')
    .positive('O valor não pode ser negativo')
    .required('Valor é obrigatório'),
})

export function Register() {
  const { user } = useAuth()

  const dataKey = `@gofinances:transactions_user:${user.id}`
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  })

  const { navigate } = useNavigation<RegisterNavigationProps>()

  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  })

  const [transactionType, setTransactionType] = useState('')
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false)
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true)
  }

  function handleTransactionTypeSelect(type: 'positive' | 'negative') {
    setTransactionType(type)
  }

  async function handleRegister(form: FormData) {
    if (!transactionType) {
      return Alert.alert('Selecione o tipo da transação')
    }

    if (category.key === 'category') {
      return Alert.alert('Selecione a categoria')
    }

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date(),
    }

    try {
      const data = await AsyncStorage.getItem(dataKey)
      const currentData = data ? JSON.parse(data) : []

      const dataFormatted = [...currentData, newTransaction]
      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted))

      reset()
      setTransactionType('')
      setCategory({
        key: 'category',
        name: 'Categoria',
      })

      navigate('Listagem')
    } catch (error) {
      console.error('screen:Register\nmetódo:HandleRegister\nerror', error)
      Alert.alert('Não foi possível salvar')
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
              name="name"
              control={control}
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name?.message}
            />
            <InputForm
              name="amount"
              control={control}
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount?.message}
            />

            <TransactionsTypes>
              <TransactionTypeButton
                title="Income"
                type="positive"
                onPress={() => handleTransactionTypeSelect('positive')}
                isActive={transactionType === 'positive'}
              />
              <TransactionTypeButton
                title="Outcome"
                type="negative"
                onPress={() => handleTransactionTypeSelect('negative')}
                isActive={transactionType === 'negative'}
              />
            </TransactionsTypes>

            <CategorySelectButton
              title={category.name}
              onPress={handleOpenSelectCategoryModal}
            />
          </Fields>

          <Button
            title="Enviar"
            onPress={() => handleSubmit(handleRegister)()}
          />
        </Form>

        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            closeSelectCategory={handleCloseSelectCategoryModal}
            setCategory={setCategory}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  )
}
