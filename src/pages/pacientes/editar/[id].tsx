import Notification from '@/pages/components/Notification'
import {
  AlertColor,
  Autocomplete,
  Button,
  Switch,
  TextField,
  styled,
} from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import {
  editarPaciente,
  getPacientesById,
} from '../../../../service/pacientesService'
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

  const [detalhamento, setDetalhamento] = useState('')
  const [observacoes, setObservacoes] = useState('')
  const [origem, setOrigem] = useState<string | null>('')
  const [concluido, setConcluido] = useState<boolean>(false)

  const [desfecho, setDesfecho] = useState<{
    nome: string
    value: string
  } | null>(null)
  const [encaminhamento, setEncaminhamento] = useState<{
    nome: string
    value: string
  } | null>(null)

  const [state, setState] = useState(false)
  const [isValid, setIsValid] = useState<boolean>(false)
  const [message, setMessage] = useState('')
  const [type, setType] = useState<AlertColor>('error')
  const [dateTime, setDateTime] = useState('')

  useEffect(() => {
    const currentDateTime = new Date()
    setDateTime(currentDateTime.toISOString())
  }, [])

  useEffect(() => {
    if (id) {
      getPacientePorId()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  async function getPacientePorId() {
    const data = await getPacientesById(Number(id))

    const selectedDesfecho = allDesfechos.find(
      item => item.value === data.desfecho
    )

    const selectedEncaminhamento = allEncaminhamentos.find(
      item => item.value === data.encaminhamento
    )

    setNome(data.nome)
    setTelefone(data.telefone)
    setCpf(data.cpf)
    setDesfecho(selectedDesfecho || null)
    setObservacoes(data.observacoes)
    setEncaminhamento(selectedEncaminhamento || null)
    setSexo(data.sexo)
    setDataNasci(data.nascimento)
    setOrigem(data.origem)
    setDetalhamento(data.detalhes)
    setEndereco(data.endereco)
    setCns(data.cns)
    setConcluido(data.status === 'CONCLUIDO' && true)
  }

  const payload = {
    id: Number(id),
    nome: nome,
    telefone: telefone,
    ultima_alteracao: dateTime,
    cpf: cpf,
    desfecho: desfecho?.value,
    observacoes: observacoes,
    detalhes: detalhamento,
    encaminhamento: encaminhamento?.value,
    sexo: sexo,
    nascimento: dataNasci,
    origem: origem,
    endereco: endereco,
    cns: cns,
    status:
      desfecho?.value === 'ATENDIDO' && !concluido
        ? 'EM_ANDAMENTO'
        : concluido
        ? 'CONCLUIDO'
        : 'NAO_INICIADO',
  }

  const allDesfechos = [
    { nome: 'Atendido', value: 'ATENDIDO' },
    { nome: 'Não disponível', value: 'NAO_DISPONIVEL' },
    { nome: 'Não ligar', value: 'NAO_LIGAR' },
    { nome: 'Não atendeu a ligação', value: 'NAO_ATENDEU_LIGACAO' },
    { nome: 'Telefone incorreto', value: 'TELEFONE_INCORRETO' },
  ]
  const allEncaminhamentos = [
    {
      nome: 'Não Encaminhado ',
      value: 'NAO_ENCAMINHADO',
    },
    { nome: 'Medicina', value: 'MEDICINA' },
    { nome: 'Fisioterapia', value: 'FISIOTERAPIA' },
    { nome: 'Enfermagem', value: 'ENFERMAGEM' },
    { nome: 'Nutrição', value: 'NUTRICAO' },
    { nome: 'Farmácia', value: 'FARMARCIA' },
    {
      nome: 'Clínica Escola de Fisioterapia ',
      value: 'CLINICA_ESCOLA_FISIOTERAPIA',
    },
    {
      nome: 'Programa de Atenção Ampliada à Saúde (PAAS) ',
      value: 'PAAS',
    },
  ]
  const allOrigens = [
    'Farmácia Municipal',
    'Busca Espontânea',
    'UBS',
    'Outros',
  ]

  const editar = async () => {
    if (await editarPaciente(payload)) {
      setIsValid(true)
      setState(true)
      setType('success')
      setMessage('Alterações salvas com sucesso.')
      setTimeout(() => {
        router.back()
      }, 1000)
    } else {
      setIsValid(true)
      setState(true)
      setType('error')
      setMessage('Verifique os campos obrigatórios (*)')
    }
  }

  return (
    <>
      <Head>
        <title>Unitelecuidado</title>
      </Head>
      <div className='flex mx-1/4 py-20 flex-col gap-16'>
        <>
          <span className='font-semibold text-4xl text-padrao-blue'>
            Dados Pessoais
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
            <div className='flex gap-10 w-full'>
              <div className='bg-padrao-gray rounded-md w-1/2'>
                <ReactInputMask
                  mask='(99) 99999-9999'
                  value={telefone}
                  onChange={e => setTelefone(e.target.value)}
                >
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
                        fontWeight: 600,
                      },
                      width: '100%',
                    }}
                  />
                </ReactInputMask>
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
                      fontWeight: 600,
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
                    fontWeight: 600,
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
                      fontWeight: 600,
                    },
                    width: '100%',
                  }}
                />
              </div>
              <div className='bg-padrao-gray rounded-md w-1/2'>
                <Autocomplete
                  options={[
                    'Feminino',
                    'Masculino',
                    'Prefiro não informar',
                  ]}
                  value={sexo}
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
                    fontWeight: 600,
                  },
                  width: '100%',
                }}
              />
            </div>
          </div>
        </>
        <>
          <span className='font-semibold text-4xl text-padrao-blue'>
            Detalhamento
          </span>

          <div className='flex flex-col gap-8'>
            <div className='bg-padrao-gray rounded-md w-full'>
              <Autocomplete
                options={allDesfechos}
                getOptionLabel={option => option.nome}
                size='medium'
                value={desfecho}
                onChange={(event, newValue) => {
                  setDesfecho(newValue)
                  if (newValue?.value !== 'ATENDIDO') {
                    setEncaminhamento(null)
                  }
                }}
                renderInput={params => (
                  <PadraoTextField
                    {...params}
                    label='Desfecho'
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
            {desfecho?.value === 'ATENDIDO' ? (
              <div className='bg-padrao-gray rounded-md w-full'>
                <Autocomplete
                  options={allEncaminhamentos}
                  getOptionLabel={option => option.nome}
                  size='medium'
                  onChange={(event, newValue) => {
                    setEncaminhamento(newValue)
                  }}
                  value={encaminhamento}
                  renderInput={params => (
                    <PadraoTextField
                      {...params}
                      label='Encaminhamento'
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
            ) : null}

            <div className='bg-padrao-gray rounded-md'>
              <PadraoTextField
                type='String'
                label='Dados'
                multiline
                rows={3}
                onChange={event => {
                  setDetalhamento(event.target.value)
                }}
                value={detalhamento}
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
        </>

        <>
          <span className='font-semibold text-4xl text-padrao-blue'>
            Observações
          </span>

          <div className='flex flex-col gap-8'>
            <div className='bg-padrao-gray rounded-md'>
              <PadraoTextField
                type='String'
                label='Dados'
                multiline
                rows={3}
                onChange={event => {
                  setObservacoes(event.target.value)
                }}
                value={observacoes}
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
                    label='Origem'
                    required
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
        </>
        <div className='flex items-center justify-between'>
          <span className='font-semibold text-4xl text-padrao-blue'>
            Concluir Atendimento
          </span>
          <Switch
            checked={concluido}
            onChange={event => {
              setConcluido(event.target.checked)
            }}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </div>

        <div className='rounded-md flex justify-end gap-10 items-center'>
          <span
            className={`text-padrao-blue hover:underline`}
            onClick={() => router.back()}
          >
            Voltar
          </span>
          <Button
            variant='contained'
            className={`bg-padrao-blue w-36 capitalize`}
            onClick={editar}
          >
            Salvar
          </Button>
        </div>
      </div>
    </>
  )
}
export default EditarPaciente
