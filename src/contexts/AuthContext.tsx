import axios from 'axios'
import * as AuthSession from 'expo-auth-session'
import { createContext, ReactNode, useState } from 'react'

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
}

interface IProps {
  children: ReactNode
}

export function AuthProvider({ children }: IProps) {
  const [user, setUser] = useState<IUser>({} as IUser)

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

        setUser({
          id: userInfo.id,
          name: userInfo.given_name,
          email: userInfo.email,
          photo: userInfo.picture,
        })
      }
    } catch (error) {
      throw new Error(error as string)
    }
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  )
}
