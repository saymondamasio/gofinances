import { Control, Controller } from 'react-hook-form'
import { TextInputProps } from 'react-native'
import { Input } from '../Input'
import { Container, Error } from './styles'

interface Props extends TextInputProps {
  control: Control<any, object>
  name: string
  error?: string
}

export function InputForm({ control, name, error, ...rest }: Props) {
  return (
    <Container>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            {...rest}
          />
        )}
      />

      {error && <Error>{error}</Error>}
    </Container>
  )
}
