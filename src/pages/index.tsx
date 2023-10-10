import { useUsers } from '@/hooks/useUsers'
import { Button, TextField, styled } from '@mui/material'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'

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

  const { data } = useUsers()

  console.log(data)

  return (
    <>
      <Head>
        <title>Unitelecuidado</title>
      </Head>
      <div className='w-full h-96vh flex mx-40 items-center gap-24'>
        <div className='w-1/2 flex justify-center'>
          <div>
            <Image
              src='/logos/logoVertical.png'
              alt='Icone'
              width={300}
              height={300}
              priority
            />
          </div>
        </div>

        <div className=' w-1/2 flex justify-center items-center'>
          <div className=' flex w-4/5 items-center bg-padrao-green rounded-2xl justify-center p-10'>
            <div className='flex flex-col gap-5 w-5/6'>
              <div className='bg-white rounded-md shadow-md'>
                <PadraoTextField
                  type='String'
                  onChange={event => {
                    setUsuario(event.target.value)
                  }}
                  value={usuario}
                  placeholder='Usuário'
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
                  //onClick={onClickButton}
                >
                  Entrar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
