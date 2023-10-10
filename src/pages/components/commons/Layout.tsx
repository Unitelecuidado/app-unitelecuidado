;('')
import { ReactNode } from 'react'
import SideBar from './SideBar'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { ThemeProvider, createTheme } from '@mui/material'

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

  useEffect(() => { // pra alterar as cores de acordo com a tela
    const updateBodyClass = () => {
      if (router.pathname === '/') {
        document.body.className = 'bg-padrao-green-light'
        setIsLogin(true)
      } else {
        document.body.className = 'bg-padrao-gray'
      }
    }

    updateBodyClass()

    router.events.on('routeChangeComplete', updateBodyClass)

    return () => {
      router.events.off('routeChangeComplete', updateBodyClass)
    }
  }, [router.events, router.pathname])

  return (
    <ThemeProvider theme={theme}>
      {isLogin ? (
        <div className='font-gotham flex h-full m-4'>{children}</div>
      ) : (
        <div className='font-gotham flex h-full m-4'>
          <SideBar />
          {children}
        </div>
      )}
    </ThemeProvider>
  )
}

export default Layout
