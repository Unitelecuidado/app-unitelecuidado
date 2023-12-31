import { AlertColor, Button, TextField, styled } from '@mui/material'
import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Usuarios } from './Props/DefaultProps'
import Notification from './components/Notification'
import { useRouter } from 'next/router'
import cookies from 'js-cookie'
import { getUser } from '../../service/userservice'

const PadraoTextField = styled(TextField)`
  input {
    color: #184066 !important; /* Defina a cor do texto */
  }

  .MuiOutlinedInput-root {
    fieldset {
      border: none;
      color: #184066;
    }
    &:hover fieldset {
      border: none;
    }
    &.Mui-focused fieldset {
      border: none;
    }
  }
`

const Login = () => {
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')
  const [users, setUsers] = useState<Usuarios[]>([])
  const [state, setState] = useState(false)
  const [isValid, setIsValid] = useState<boolean>(false)
  const [message, setMessage] = useState('')
  const [type, setType] = useState<AlertColor>('error')
  const router = useRouter()

  useEffect(() => {
    getAllUsers()
  }, [])

  async function getAllUsers() {
    const data = await getUser()
    setUsers(data)
  }

  const validateLogin = () => {
    const findUser = users.filter(
      user => user.email === usuario && user.senha === senha
    )

    if (findUser.length) {
      setIsValid(false)
      setState(false)
      cookies.set('user', JSON.stringify(findUser))
      router.push('/pacientes')
    } else {
      setIsValid(true)
      setState(true)
      setType('error')
      setMessage('Email ou Senha incorretos.')
    }
  }

  return (
    <>
      <Head>
        <title>Unitelecuidado</title>
      </Head>

      <div className='w-full h-tela flex mx-40 items-center gap-24'>
        <div className='flex w-full items-center'>
          <div className='w-full md:w-1/2 flex justify-center'>
            <div className='pt-10 md:pt-0'>
              <Image
                src='/logos/logoVertical.png'
                alt='Icone'
                width={300}
                height={300}
                priority
              />
            </div>
          </div>
          {isValid ? (
            <Notification
              type={type}
              message={message}
              isOpen={state}
              setIsOpen={setState}
            ></Notification>
          ) : null}
          <div className=' w-full md:w-1/2 flex justify-center items-center'>
            <div className=' flex w-4/5 items-center bg-padrao-green rounded-2xl justify-center p-10'>
              <div className='flex flex-col gap-5 w-5/6'>
                <div className='bg-white rounded-md shadow-md'>
                  <PadraoTextField
                    type='String'
                    onChange={event => {
                      setUsuario(event.target.value)
                    }}
                    value={usuario}
                    placeholder='Email'
                    sx={{
                      '.MuiFormLabel-root': {
                        alignItems: 'center',
                        display: 'flex',
                        height: '25px',
                        color: '#184066',
                        fontWeight: 500,
                      },
                      width: '100%',
                    }}
                  />
                </div>
                <div className='bg-white rounded-md shadow-md'>
                  <PadraoTextField
                    type='password'
                    autoComplete='current-password'
                    onChange={event => {
                      setSenha(event.target.value)
                    }}
                    value={senha}
                    placeholder='Senha'
                    sx={{
                      '.MuiFormLabel-root': {
                        alignItems: 'center',
                        display: 'flex',
                        height: '25px',
                        color: '#184066',
                        fontWeight: 500,
                      },
                      width: '100%',
                    }}
                  />
                </div>
                <div className='rounded-md flex justify-center'>
                  <Button
                    variant='contained'
                    className={`bg-padrao-blue w-36`}
                    onClick={validateLogin}
                  >
                    Entrar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='fixed bottom-0 left-0 w-full h-1/6 bg-padrao-blue'>
          <div className='flex justify-end items-center'>
            <div className='pt-10 md:pt-0'>
              <Image
                src='/logos/logoInfobio.png'
                alt='Icone'
                width={200}
                height={200}
                priority
              />
            </div>
            <div className='pt-10 md:pt-0'>
              <Image
                src='/logos/ufcspa.png'
                alt='Icone'
                width={200}
                height={200}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
