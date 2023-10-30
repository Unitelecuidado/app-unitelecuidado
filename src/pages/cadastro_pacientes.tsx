import { Button, TextField, styled } from '@mui/material'
import Head from 'next/head'
import { useState } from 'react'
import { cadastrarPaciente } from '../../service/pacientesService'
import Notification from './components/Notification'
import InputMask from 'react-input-mask'

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

const CadastroPacientes = () => {
  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [isValid, setIsValid] = useState<boolean>()
  const [state, setState] = useState(false)

  const payload = { nome: nome, telefone: telefone, ativo: true }

  const cadastrar = async () => {
    await cadastrarPaciente('/pacientes', payload)
      .then(() => {
        setIsValid(true)
        setState(true)
        setNome('')
        setTelefone('')
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
          Pré-cadastro
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
                  fontWeight: 500,
                },
                width: '100%',
              }}
            />
          </div>
          <div className='bg-padrao-gray rounded-md'>
            <InputMask
              mask='(99) 99999-9999'
              value={telefone}
              onChange={e => setTelefone(e.target.value)}
            >
              {() => (
                <PadraoTextField
                  type='tel'
                  label='Telefone'
                  value={telefone}
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
              )}
            </InputMask>
          </div>
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

export default CadastroPacientes
