import { AlertColor, Button, TextField, styled } from '@mui/material'
import Head from 'next/head'
import Notification from './components/Notification'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'
import cookies from 'js-cookie'

import { updateUser } from '../../service/userservice'
import { Usuarios } from './Props/DefaultProps'

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
const Configuracoes = () => {
  const router = useRouter()
  const [senha, setSenha] = useState('')
  const [confirmaSenha, setConfirmaSenha] = useState('')
  const [state, setState] = useState(false)
  const [isValid, setIsValid] = useState<boolean>(false)
  const [message, setMessage] = useState('')
  const [type, setType] = useState<AlertColor>('error')
  const [userData, setUserData] = useState<Usuarios[]>([])

  const user = cookies.get('user')

  useEffect(() => {
    if (user) {
      setUserData(JSON.parse(user))
    }
  }, [user])

  const payload = {
    id: Number(userData[0]?.id),
    nome: userData[0]?.nome,
    email: userData[0]?.email,
    especialidade: userData[0]?.especialidade,
    senha: senha,
    cargo: userData[0]?.cargo,
    ativo: true,
  }

  const alterar = async () => {
    if (senha === confirmaSenha) {
      if (await updateUser(payload)) {
        setIsValid(true)
        setState(true)
        setType('success')
        setMessage('Senha alterada. Deslogando...')
        setTimeout(() => {
          cookies.remove('user')
          router.push('/')
        }, 2000)
      } else {
        setIsValid(true)
        setState(true)
        setType('error')
        setMessage('Preencha os campos.')
      }
    } else {
      setIsValid(true)
      setState(true)
      setType('error')
      setMessage('A confirmação de senha não confere.')
    }
  }
  return (
    <>
      <Head>
        <title>Unitelecuidado</title>
      </Head>
      <div className='flex mx-1/4 py-20 flex-col gap-16'>
        <span className='font-semibold text-4xl text-padrao-blue'>
          Alterar Senha
        </span>
        {isValid ? (
          <Notification
            type={type}
            message={message}
            isOpen={state}
            setIsOpen={setState}
          ></Notification>
        ) : null}
        <div className='flex flex-col gap-8'>
          <div className='bg-padrao-gray rounded-md'>
            <PadraoTextField
              type='password'
              onChange={event => {
                setSenha(event.target.value)
              }}
              label='Senha'
              placeholder='Digite a nova senha'
              value={senha}
              sx={{
                '.MuiFormLabel-root': {
                  alignItems: 'center',
                  display: 'flex',
                  height: '25px',
                  color: '#184066',
                  fontWeight: 600,
                },
                width: '100%',
              }}
            />
          </div>
          <div className='bg-padrao-gray rounded-md'>
            <PadraoTextField
              type='password'
              onChange={event => {
                setConfirmaSenha(event.target.value)
              }}
              label='Confirme a senha'
              value={confirmaSenha}
              sx={{
                '.MuiFormLabel-root': {
                  alignItems: 'center',
                  display: 'flex',
                  height: '25px',
                  color: '#184066',
                  fontWeight: 600,
                },
                width: '100%',
              }}
            />
          </div>
        </div>

        <div className='rounded-md flex justify-end'>
          <Button
            variant='contained'
            className={`bg-padrao-blue w-36 capitalize`}
            onClick={alterar}
          >
            Alterar
          </Button>
        </div>
      </div>
    </>
  )
}

export default Configuracoes
