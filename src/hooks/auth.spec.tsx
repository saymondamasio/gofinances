/* eslint-disable import/first */
import fetchMock from 'jest-fetch-mock'
fetchMock.enableMocks()

import { act, renderHook } from '@testing-library/react-hooks'
import { startAsync } from 'expo-auth-session'
import { mocked } from 'jest-mock'
import { AuthProvider } from '../contexts/AuthContext'
import { useAuth } from './auth'

const userTest = {
  id: 'any_id',
  email: 'john.doe@email.com',
  name: 'John Doe',
  photo: 'any_photo.png',
}

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}))

describe('Auth hook', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  it('should be able to sign in with Google account existing', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(userTest))

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    })

    await act(() => result.current.signInWithGoogle())
    await waitForNextUpdate()

    expect(result.current.user.email).toBe(userTest.email)
  })
})
