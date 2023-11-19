import {
  AlertColor,
  Autocomplete,
  Button,
  TextField,
  styled,
} from '@mui/material'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { cadastrarPaciente } from '../../service/pacientesService'
import Notification from './components/Notification'
import ReactInputMask from 'react-input-mask'

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
  const [origem, setOrigem] = useState<string | null>('')
  const [state, setState] = useState(false)
  const [isValid, setIsValid] = useState<boolean>(false)
  const [message, setMessage] = useState('')
  const [type, setType] = useState<AlertColor>('error')
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
    status: 'NAO_INICIADO',
    origem: origem,
  }

  const allOrigens = [
    'Farmácia Municipal',
    'Busca Espontânea',
    'UBS',
    'Outros',
  ]

  const cadastrar = async () => {
    if (await cadastrarPaciente(payload)) {
      setIsValid(true)
      setState(true)
      setType('success')
      setMessage('Paciente cadastrado com sucesso.')
      setNome('')
      setTelefone('')
      setOrigem('')
    } else {
      setIsValid(true)
      setState(true)
      setType('error')
      setMessage('Todos os campos são obrigatórios.')
    }
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
            type={type}
            message={message}
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
                  fontWeight: 600,
                },
                width: '100%',
              }}
            />
          </div>
          <div className='bg-padrao-gray rounded-md'>
            <ReactInputMask
              mask='(99) 99999-9999'
              value={telefone}
              onChange={e => setTelefone(e.target.value)}
            >
              <PadraoTextField
                type='tel'
                required
                label='Telefone'
                value={telefone}
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
            </ReactInputMask>
          </div>
          <div className='bg-padrao-gray rounded-md'>
            <Autocomplete
              options={allOrigens}
              getOptionLabel={option => option}
              size='medium'
              onChange={(event, newValue) => {
                setOrigem(newValue)
              }}
              value={origem}
              renderInput={params => (
                <PadraoTextField
                  {...params}
                  required
                  label='Origem'
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
