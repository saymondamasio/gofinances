import React from 'react'
import { FlatList } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Button } from '../../components/Form/Button'
import { categories } from '../../utils/categories'
import {
  Category,
  Container,
  Footer,
  Header,
  Icon,
  Name,
  Separator,
  Title,
} from './styles'

interface CategoryType {
  key: string
  name: string
}

interface Props {
  category: CategoryType
  setCategory: (category: CategoryType) => void
  closeSelectCategory: () => void
}

export function CategorySelect({
  category,
  closeSelectCategory,
  setCategory,
}: Props) {
  function handleCategorySelect(item: CategoryType) {
    setCategory(item)
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Container>
        <Header>
          <Title>Categoria</Title>
        </Header>

        <FlatList
          data={categories}
          style={{ flex: 1, width: '100%' }}
          keyExtractor={item => item.key}
          ItemSeparatorComponent={() => <Separator />}
          renderItem={({ item }) => (
            <Category
              onPress={() => handleCategorySelect(item)}
              isActive={category.key === item.key}
            >
              <Icon name={item.icon} />
              <Name>{item.name}</Name>
            </Category>
          )}
        />

        <Footer>
          <Button title="Selecionar" onPress={closeSelectCategory} />
        </Footer>
      </Container>
    </GestureHandlerRootView>
  )
}
