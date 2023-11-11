import { Autocomplete, Button, TextField, styled } from '@mui/material'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import Notification from './components/Notification'
import { allThing } from './Props/DefaultProps'
import { createUser } from '../../service/userService'

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

const CadastroUsuarios = () => {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [especialidade, setEspecialidade] = useState<allThing | null>(null)
  const [cargo, setCargo] = useState<allThing | null>(null)
  const [isValid, setIsValid] = useState<boolean>()
  const [state, setState] = useState(false)
  const [dateTime, setDateTime] = useState('')

  useEffect(() => {
    const currentDateTime = new Date()
    setDateTime(currentDateTime.toISOString())
  }, [])

  const payload = {
    nome: nome,
    email: email,
    especialidade: especialidade?.value,
    senha: '1234',
    cargo: cargo?.value,
    ativo: true,
  }

  const allEspecialidades = [
    { name: 'Medicina', value: 'MEDICINA' },
    { name: 'Fisioterapia', value: 'FISIOTERAPIA' },
    { name: 'Enfermagem', value: 'ENFERMAGEM' },
    { name: 'Nutrição', value: 'NUTRICAO' },
    { name: 'Farmácia', value: 'FARMACIA' },
  ]

  const allCargos = [
    { name: 'Administrador', value: 'ADMIN' },
    { name: 'Monitor', value: 'MONITOR' },
    { name: 'Professor', value: 'PROFESSOR' },
  ]

  const cadastrar = async () => {
    await createUser(payload)
      .then(() => {
        setIsValid(true)
        setState(true)
        setNome('')
        setEmail('')
        setEspecialidade(null)
        setCargo(null)
      })
      .catch(() => {
        setIsValid(false)
        setState(false)
      })
  }

  return (
    <>
      <Head>
        <title>Unitelecuidado</title>
      </Head>
      <div className='flex mx-1/4 py-20 flex-col gap-16'>
        <span className='font-semibold text-4xl text-padrao-blue'>
          Cadastro de Usuários
        </span>
        {isValid ? (
          <Notification
            type='success'
            message='mensagem de sucesso!!!'
            isOpen={state}
            setIsOpen={setState}
          ></Notification>
        ) : null}
        <div className='flex flex-col gap-8'>
          <div className='bg-padrao-gray rounded-md'>
            <PadraoTextField
              type='String'
              onChange={event => {
                setNome(event.target.value)
              }}
              label='Nome'
              value={nome}
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
              type='email'
              onChange={event => {
                setEmail(event.target.value)
              }}
              label='Email'
              value={email}
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
            <Autocomplete
              options={allEspecialidades}
              getOptionLabel={option => option.name}
              size='medium'
              onChange={(event, newValue) => {
                setEspecialidade(newValue)
              }}
              value={especialidade}
              renderInput={params => (
                <PadraoTextField
                  {...params}
                  label='Especialidade'
                  variant='outlined'
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
              )}
            />
          </div>
          <div className='bg-padrao-gray rounded-md'>
            <Autocomplete
              options={allCargos}
              getOptionLabel={option => option.name}
              size='medium'
              onChange={(event, newValue) => {
                setCargo(newValue)
              }}
              value={cargo}
              renderInput={params => (
                <PadraoTextField
                  {...params}
                  label='Cargo'
                  variant='outlined'
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
              )}
            />
          </div>
          <span className='text-padrao-blue'>
            *A senha padrão para todo novo usuário é 1234.
          </span>
        </div>

        <div className='rounded-md flex justify-end'>
          <Button
            variant='contained'
            className={`bg-padrao-blue w-36 capitalize`}
            onClick={cadastrar}
          >
            Cadastrar
          </Button>
        </div>
      </div>
    </>
  )
}

export default CadastroUsuarios
