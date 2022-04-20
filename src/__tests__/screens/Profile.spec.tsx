import { render } from '@testing-library/react-native'
import React from 'react'
import { Profile } from '../../screens/Profile'

describe('Profile', () => {
  it('should have placeholder correctly in user name input', () => {
    const { getByPlaceholderText } = render(<Profile />)

    const input = getByPlaceholderText('Nome')

    expect(input).toBeTruthy()
  })

  it('should be loaded user data', () => {
    const { getByTestId } = render(<Profile />)

    const inputName = getByTestId('input-name')
    const inputSurname = getByTestId('input-surname')

    expect(inputName).toBeTruthy()
    expect(inputSurname).toBeTruthy()

    expect(inputName.props.value).toEqual('Saymon')
    expect(inputSurname.props.value).toEqual('Damasio')
  })

  it('should exists title correctly', () => {
    const { getByTestId } = render(<Profile />)

    const textTitle = getByTestId('text-title')

    expect(textTitle.children).toContain('Perfil')
  })
})
