import { act, renderHook } from '@testing-library/react-hooks'
import { startAsync } from 'expo-auth-session'
import fetchMock from 'jest-fetch-mock'
import { mocked } from 'jest-mock'
import { AuthProvider } from '../contexts/AuthContext'
import { useAuth } from './auth'

// Coloque no inicio do arquivo para habilitar o mock do fetch.
fetchMock.enableMocks()

const userTest = {
  id: 'any_id',
  email: 'john.doe@email.com',
  name: 'John Doe',
  photo: 'any_photo.png',
}

jest.mock('expo-auth-session')

describe('Auth hook', () => {
  it('should be able to sign in with Google account existing', async () => {
    const googleMocked = mocked(startAsync as any)
    googleMocked.mockReturnValueOnce({
      type: 'success',
      params: {
        access_token: 'any_token',
      },
    })

    fetchMock.mockResponseOnce(JSON.stringify(userTest))

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    })

    act(async () => await result.current.signInWithGoogle())
    await waitForNextUpdate()

    expect(result.current.user.email).toBe(userTest.email)
  })
})
