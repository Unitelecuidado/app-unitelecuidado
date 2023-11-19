import Head from 'next/head'
import { useEffect, useState } from 'react'
import { getPacientes } from '../../service/pacientesService'
import { Pacientes } from './Props/DefaultProps'

import SearchBox from './components/SearchBox'
import PacientesList from './components/PacientesList'
import {
  ArrowDownwardOutlined,
  ArrowUpwardOutlined,
} from '@mui/icons-material'

const Pacientes = () => {
  const [pacientes, setPacientes] = useState<Pacientes[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const [pacientesFiltrados, setPacientesFiltrados] = useState<
    Pacientes[]
  >([])
  const [buscando, setBuscando] = useState('')

  const [selected, setSelected] = useState('')
  const [orderSorting, setOrderSorting] = useState(false)

  useEffect(() => {
    getAllPacientes()
  }, [loading])

  async function getAllPacientes() {
    const data = await getPacientes()

    const pacientesOrdenados = data
      ?.filter((paciente: Pacientes) => paciente.status !== 'EM_ANDAMENTO')
      .sort((a: Pacientes, b: Pacientes) => {
        if (a.status === 'NAO_INICIADO' && b.status !== 'NAO_INICIADO') {
          return -1
        } else if (
          a.status !== 'NAO_INICIADO' &&
          b.status === 'NAO_INICIADO'
        ) {
          return 1
        } else {
          return a.nome.localeCompare(b.nome)
        }
      })

    setPacientes(pacientesOrdenados)
  }

  const getArrow = (label: string) => {
    if (!orderSorting && label === selected) {
      return (
        <ArrowUpwardOutlined
          sx={{
            width: '20px',
            paddingLeft: '5px',
          }}
        />
      )
    } else if (orderSorting && label === selected) {
      return (
        <ArrowDownwardOutlined
          sx={{
            width: '20px',
            paddingLeft: '5px',
          }}
        />
      )
    } else {
      return (
        <span className='hidden'>
          <ArrowUpwardOutlined
            sx={{
              width: '20px',
              paddingLeft: '5px',
              color: '#184066',
            }}
          />
        </span>
      )
    }
  }

  const sorting = (option: string) => {
    let sorted: Pacientes[] = []

    if (pacientes) {
      if (orderSorting) {
        sorted = pacientes?.sort((a, b) =>
          (a[option as keyof Pacientes] as string).localeCompare(
            b[option as keyof Pacientes] as string
          )
        )
      }
      if (!orderSorting) {
        sorted = pacientes?.sort((a, b) =>
          (b[option as keyof Pacientes] as string).localeCompare(
            a[option as keyof Pacientes] as string
          )
        )
      }
      setOrderSorting(!orderSorting)
      setPacientes(sorted)
    }
  }

  const changeArrow = (label: string) => {
    setSelected(label)
  }

  const handleClick = (label: string) => {
    changeArrow(label)
    sorting(label)
  }

  return (
    <>
      <Head>
        <title>Unitelecuidado</title>
      </Head>
      <div className='flex mx-16 py-16 flex-col gap-10'>
        <span className='font-semibold text-4xl text-padrao-blue  top-20 '>
          Lista de Pacientes
        </span>
        <div>
          <SearchBox
            buscando={buscando}
            setBuscando={setBuscando}
            allPacientes={pacientes}
            setPacientesFiltrados={setPacientesFiltrados}
          />
        </div>
        <div className='flex flex-col'>
          <div className='flex w-full justify-between items-center h-10 px-5 py-2 rounded-md font-medium uppercase text-md bg-padrao-gray text-padrao-gray-dark'>
            <div className='flex w-full gap-5 items-center pr-5'>
              <div
                className='flex w-2/5 items-center cursor-pointer'
                onClick={() => handleClick('nome')}
              >
                <span>Nome</span>
                <span>{getArrow('nome')}</span>
              </div>
              <div
                className='flex w-1/5 overflow-auto items-center cursor-pointer'
                onClick={() => handleClick('telefone')}
              >
                <span>Telefone</span>
                <span>{getArrow('telefone')}</span>
              </div>
              <div
                className='flex w-1/5 overflow-auto items-center cursor-pointer'
                onClick={() => handleClick('desfecho')}
              >
                <span>Desfecho</span>
                <span>{getArrow('desfecho')}</span>
              </div>
              <div
                className='flex w-1/5 overflow-auto items-center cursor-pointer'
                onClick={() => handleClick('ultima_alteracao')}
              >
                <span>Última Alteração</span>
                <span>{getArrow('ultima_alteracao')}</span>
              </div>
              <div
                className='flex w-1/5 overflow-auto items-center cursor-pointer'
                onClick={() => handleClick('status')}
              >
                <span>Status</span>
                <span>{getArrow('status')}</span>
              </div>
            </div>
            <span>Opções</span>
          </div>
          <div className=' flex flex-col max-h-full overflow-y-auto'>
            {buscando === '' ? (
              pacientes.length ? (
                pacientes.map(paciente => (
                  <PacientesList
                    key={paciente.id}
                    paciente={paciente}
                    setLoading={setLoading}
                    loading={loading}
                  />
                ))
              ) : (
                <div className='flex justify-center p-20 gap-5 font-medium text-padrao-blue flex-col'>
                  <span className='flex justify-center text-3xl'>
                    Sem Pacientes Cadastrados
                  </span>
                  <span className='flex justify-center text-lg '>
                    Cadastre um novo em Cadastro de Pacientes.
                  </span>
                </div>
              )
            ) : buscando && pacientesFiltrados.length ? (
              pacientesFiltrados.map(paciente => (
                <PacientesList
                  key={paciente.id}
                  paciente={paciente}
                  setLoading={setLoading}
                  loading={loading}
                />
              ))
            ) : (
              <div className='flex justify-center p-20 gap-5 font-medium text-padrao-blue flex-col'>
                <span className='flex justify-center text-3xl'>
                  Paciente não encontrado
                </span>
                <span className='flex justify-center text-lg '>
                  Verifique sua busca.
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Pacientes
