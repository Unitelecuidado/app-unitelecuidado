import Head from 'next/head'
import { useEffect, useState } from 'react'
import { getPacientes } from '../../service/pacientesService'
import { Pacientes } from './Props/DefaultProps'
import { Delete, Edit } from '@mui/icons-material'

import { format } from 'date-fns'
import SearchBox from './components/SearchBox'
import Link from 'next/link'

const Pacientes = () => {
  const [pacientes, setPacientes] = useState<Pacientes[]>([])

  const [pacientesFiltrados, setPacientesFiltrados] = useState<
    Pacientes[]
  >([])
  const [buscando, setBuscando] = useState('')
  const [encaminhamento, setEncaminhamento] = useState([])

  useEffect(() => {
    getAllPacientes()
  }, [])

  async function getAllPacientes() {
    const data = await getPacientes('/pacientes')
    setPacientes(data)
  }

  return (
    <>
      <Head>
        <title>Unitelecuidado</title>
      </Head>
      <div className='flex mx-16 py-16 flex-col gap-10'>
        <span className='font-semibold text-4xl text-padrao-blue  top-20 absolute'>
          Lista de Pacientes
        </span>
        <div>
          <SearchBox
            buscando={buscando}
            setBuscando={setBuscando}
            allPacientes={pacientes}
            setPacientesFiltrados={setPacientesFiltrados}
            // setEncaminhamento={setEncaminhamento}
          />
        </div>
        <div className='flex flex-col'>
          <div className='flex w-full justify-between items-center px-5 py-2 rounded-md font-medium uppercase text-md bg-padrao-gray text-padrao-gray-dark'>
            <span className='w-2/6'>Nome</span>
            <span className='w-1/6'>Telefone</span>
            <span className='w-1/6 overflow-auto'>Encaminhamento</span>
            <span className='w-1/6 hidden md:flex'>Última Alteração</span>
            <span>Opções</span>
          </div>
          <div className=' flex flex-col overflow-y-auto'>
            {buscando === '' ? (
              pacientes.length ? (
                pacientes.map(paciente => (
                  <>
                    <div
                      key={paciente.id}
                      className='flex w-full justify-between items-center px-5 py-4 rounded-md font-medium uppercase text-md text-padrao-blue'
                    >
                      <span className='w-2/6'>{paciente.nome}</span>
                      <span className='w-1/6'>{paciente.telefone}</span>
                      <span className='w-1/6'>
                        {paciente.encaminhamento
                          ? paciente.encaminhamento
                          : 'Não definido'}
                      </span>
                      <span className='w-1/6  hidden md:flex'>
                        {paciente.ultima_alteracao
                          ? format(
                              new Date(paciente.ultima_alteracao),
                              'dd/MM/yyyy'
                            )
                          : 'Não definido'}
                      </span>
                      <span className='flex gap-3'>
                        <Link href={`/pacientes/editar/${paciente.id}`}>
                          <Edit />
                        </Link>
                        <span>
                          <Delete />
                        </span>
                      </span>
                    </div>
                    <hr></hr>
                  </>
                ))
              ) : (
                <div className='flex justify-center p-20 gap-5 font-medium text-padrao-blue flex-col'>
                  <span className='flex justify-center text-3xl'>
                    Sem Pacientes Cadastrados.
                  </span>
                  <span className='flex justify-center text-lg '>
                    Cadastre um novo na tela de Cadastro de Pacientes.
                  </span>
                </div>
              )
            ) : buscando && pacientesFiltrados.length ? (
              pacientesFiltrados.map(paciente => (
                <>
                  <div
                    key={paciente.id}
                    className='flex w-full justify-between items-center px-5 py-4 rounded-md font-medium uppercase text-md text-padrao-blue'
                  >
                    <span className='w-2/6'>{paciente.nome}</span>
                    <span className='w-1/6'>{paciente.telefone}</span>
                    <span className='w-1/6'>
                      {paciente.encaminhamento
                        ? paciente.encaminhamento
                        : 'Não definido'}
                    </span>
                    <span className='w-1/6  hidden md:flex'>
                      {paciente.ultima_alteracao
                        ? format(
                            new Date(paciente.ultima_alteracao),
                            'dd/MM/yyyy'
                          )
                        : 'Não definido'}
                    </span>
                    <span className='flex gap-3'>
                      <Edit />
                      <Delete />
                    </span>
                  </div>
                  <hr></hr>
                </>
              ))
            ) : (
              <div className='flex justify-center p-20 gap-5 font-medium text-padrao-blue flex-col'>
                <span className='flex justify-center text-3xl'>
                  Paciente não encontrado.
                </span>
                <span className='flex justify-center text-lg '>
                  Verifique se o nome está correto.
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
