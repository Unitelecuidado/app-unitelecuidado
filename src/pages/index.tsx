import { TextField, styled } from '@mui/material'
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
  return (
    <>
      <Head>
        <title>Unitelecuidado</title>
      </Head>
      <div className='w-full h-96vh flex justify-between mx-52 items-center'>
        <div className='w-1/2 flex justify-center'>
          <Image
            src='/logos/logoVertical.png'
            alt='Icone'
            width={300}
            height={300}
            priority
          />
        </div>
        <div className='w-1/2 flex bg-padrao-green rounded-md justify-center p-10'>
          <div className='flex flex-col gap-5 w-2/3'>
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
                type='String'
                onChange={event => {
                  setUsuario(event.target.value)
                }}
                value={usuario}
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
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
