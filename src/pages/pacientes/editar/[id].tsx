import Notification from '@/pages/components/Notification'
import { Autocomplete, Button, TextField, styled } from '@mui/material'
import { useRouter } from 'next/router'
import InputMask from 'react-input-mask'

import { useEffect, useState } from 'react'
import Head from 'next/head'

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

const EditarPaciente = () => {
  const router = useRouter()
  const { id } = router.query //id do paciente

  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [dataNasci, setDataNasci] = useState('')
  const [endereco, setEndereco] = useState('')

  const [sexo, setSexo] = useState<string | null>('')

  const [cpf, setCpf] = useState('')

  const [cns, setCns] = useState('')

  const [isValid, setIsValid] = useState<boolean>()
  const [state, setState] = useState(false)
  const [dateTime, setDateTime] = useState('')

  useEffect(() => {
    const currentDateTime = new Date()
    setDateTime(currentDateTime.toISOString())
  }, [])

  const payload = {
    nome: nome,
    telefone: telefone,
    ativo: true,
    ultima_alteracao: dateTime,
  }

  /*  const cadastrar = async () => {
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
  } */

  return (
    <>
      <Head>
        <title>Unitelecuidado</title>
      </Head>
      <div className='flex mx-1/4 py-20 flex-col gap-16'>
        <span className='font-semibold text-4xl text-padrao-blue'>
          Dados Pessoais
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
              required
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
          <div className='flex gap-10 w-full'>
            <div className='bg-padrao-gray rounded-md w-1/2'>
              <InputMask
                mask='(99) 99999-9999'
                value={telefone}
                onChange={e => setTelefone(e.target.value)}
              >
                {() => (
                  // this error is intentional
                  <PadraoTextField
                    required
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
            <div className='bg-padrao-gray rounded-md w-1/2'>
              <PadraoTextField
                type='date'
                label='Data de Nascimento'
                onChange={event => {
                  setDataNasci(event.target.value)
                }}
                InputLabelProps={{ shrink: true }}
                value={dataNasci}
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
          <div className='bg-padrao-gray rounded-md'>
            <PadraoTextField
              type='String'
              onChange={event => {
                setEndereco(event.target.value)
              }}
              label='Endereço'
              value={endereco}
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
          <div className='flex gap-10 w-full'>
            <div className='bg-padrao-gray rounded-md w-1/2'>
              <PadraoTextField
                type='String'
                label='CPF'
                onChange={event => {
                  setCpf(event.target.value)
                }}
                value={cpf}
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
            <div className='bg-padrao-gray rounded-md w-1/2'>
              <Autocomplete
                options={['Feminino', 'Masculino', 'Prefiro não informar']}
                getOptionLabel={option => option}
                size='medium'
                onChange={(event, newValue) => {
                  setSexo(newValue)
                }}
                renderInput={params => (
                  <PadraoTextField
                    {...params}
                    label='Sexo'
                    variant='outlined'
                  />
                )}
              />
            </div>
          </div>

          <div className='bg-padrao-gray rounded-md'>
            <PadraoTextField
              type='String'
              label='CNS'
              onChange={event => {
                setCns(event.target.value)
              }}
              value={cns}
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
        <div className='rounded-md flex justify-end'>
          <Button
            variant='contained'
            className={`bg-padrao-blue w-36 capitalize`}
            /*  onClick={cadastrar} */
          >
            Editar
          </Button>
        </div>
      </div>
    </>
  )
}
export default EditarPaciente
