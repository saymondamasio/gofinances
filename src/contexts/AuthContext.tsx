import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import * as AppleAuthentication from 'expo-apple-authentication'
import * as AuthSession from 'expo-auth-session'
import { createContext, ReactNode, useEffect, useState } from 'react'

const { CLIENT_ID } = process.env
const { REDIRECT_URI } = process.env

export const AuthContext = createContext<IAuthContextData>(
  {} as IAuthContextData
)

interface IUser {
  id: string
  name: string
  email: string
  photo?: string
}

interface IAuthorizationGoogleResponse {
  params: {
    access_token: string
  }
  type: string
}

interface IAuthContextData {
  user: IUser
  signInWithGoogle: () => Promise<void>
  signInWithApple: () => Promise<void>
  signOut: () => Promise<void>
  userStorageLoading: boolean
}

interface IProps {
  children: ReactNode
}

export function AuthProvider({ children }: IProps) {
  const [user, setUser] = useState<IUser>({} as IUser)
  const [userStorageLoading, setUserStorageLoading] = useState(true)

  const userStorageKey = '@gofinances:user'

  async function loadUserStorageData() {
    setUserStorageLoading(true)
    const userStorageRaw = await AsyncStorage.getItem(userStorageKey)

    if (userStorageRaw) {
      const userLogged = JSON.parse(userStorageRaw) as IUser
      setUser(userLogged)
    }

    setUserStorageLoading(false)
  }

  useEffect(() => {
    loadUserStorageData()
  }, [])

  async function signInWithApple() {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        ],
      })

      if (credential) {
        const name = credential.fullName?.givenName!
        const fullName = `${name} ${credential.fullName?.familyName}`
        const userLogged = {
          id: String(credential.user),
          name,
          email: credential.email!,
          photo: `https://ui-avatars.com/api/?name=${encodeURI(
            fullName
          )}&length=2&background=363f5f&color=fff`,
        }

        setUser(userLogged)
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged))
      }
    } catch (error) {}
  }

  async function signInWithGoogle() {
    try {
      const RESPONSE_TYPE = 'token'
      const SCOPE = encodeURI('profile email')

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`

      const { type, params } = (await AuthSession.startAsync({
        authUrl,
      })) as IAuthorizationGoogleResponse

      if (type === 'success') {
        const { data: userInfo } = await axios.get(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`
        )

        const userLogged = {
          id: userInfo.id,
          name: userInfo.given_name,
          email: userInfo.email,
          photo: userInfo.picture,
        }

        setUser(userLogged)
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged))
      }
    } catch (error) {
      throw new Error(error as string)
    }
  }

  async function signOut() {
    setUser({} as IUser)
    await AsyncStorage.removeItem(userStorageKey)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle,
        signInWithApple,
        signOut,
        userStorageLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
