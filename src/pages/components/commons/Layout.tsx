;('')
import { ReactNode } from 'react'
import SideBar from './SideBar'
import cookies from 'js-cookie'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Avatar, ThemeProvider, createTheme } from '@mui/material'
import { Usuarios } from '@/pages/Props/DefaultProps'

interface LayoutProps {
  children: ReactNode
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#184066',
    },
  },
})

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(false)
  const [userData, setUserData] = useState<Usuarios[]>([])

  // Para recuperar as informações do usuário
  const user = cookies.get('user')

  useEffect(() => {
    if (user) {
      setUserData(JSON.parse(user))
    }
  }, [user])

  useEffect(() => {
    // pra alterar as cores de acordo com a tela
    const updateBodyClass = () => {
      if (router.pathname === '/') {
        document.body.className = 'bg-padrao-green-light'
      } else {
        document.body.className = 'bg-padrao-gray'
        setIsLogin(true)
      }
    }

    updateBodyClass()

    router.events.on('routeChangeComplete', updateBodyClass)

    return () => {
      router.events.off('routeChangeComplete', updateBodyClass)
    }
  }, [router.events, router.pathname, isLogin])

  /*   const capitalizeName = () => {
    if (userData?.length) {
      const list = userData[0].nome.toUpperCase().split(' ')
    }
    return (
      userData[0].nome.charAt(0).toUpperCase() +
      userData[0].nome.slice(1).toLowerCase()
    )
  } */

  const avatarName = () => {
    if (userData?.length) {
      const list = userData[0].nome.toUpperCase().split(' ')
      return list[0].substring(0, 1) + list[1].substring(0, 1)
    }
    return ''
  }

  return (
    <ThemeProvider theme={theme}>
      {!isLogin ? (
        <div className='font-gotham flex h-full m-4'>{children}</div>
      ) : (
        <div className='font-gotham flex h-full m-8 gap-8'>
          <SideBar />
          <div className='flex bg-white h-tela w-3/4 md:w-5/6 shadow-md rounded-lg flex-col overflow-y-auto'>
            <div className='flex justify-end '>
              <Avatar
                sx={{
                  color: '0056A8',
                  bgcolor: '#184066',
                  margin: '10px 5px 10px 10px',
                }}
                variant='rounded'
              >
                {avatarName()}
              </Avatar>
              {/* 
              <div>
                <span>{capitalizeName()}</span>
              </div> */}
            </div>
            <div>{children}</div>
          </div>
        </div>
      )}
    </ThemeProvider>
  )
}

export default Layout
