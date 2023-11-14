import Head from 'next/head'
import { useEffect, useState } from 'react'
import { getPacientes } from '../../service/pacientesService'
import { Pacientes } from './Props/DefaultProps'

import SearchBox from './components/SearchBox'
import PacientesList from './components/PacientesList'

const Pacientes = () => {
  const [pacientes, setPacientes] = useState<Pacientes[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const [pacientesFiltrados, setPacientesFiltrados] = useState<
    Pacientes[]
  >([])
  const [buscando, setBuscando] = useState('')
  const [encaminhamento, setEncaminhamento] = useState([])

  useEffect(() => {
    getAllPacientes()
  }, [loading])

  async function getAllPacientes() {
    const data = await getPacientes()

    setPacientes(
      data?.filter(
        (paciente: Pacientes) => paciente.status !== 'EM_ANDAMENTO'
      )
    )
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
            // setEncaminhamento={setEncaminhamento}
          />
        </div>
        <div className='flex flex-col'>
          <div className='flex w-full justify-between items-center px-5 py-2 rounded-md font-medium uppercase text-md bg-padrao-gray text-padrao-gray-dark'>
            <div className='flex w-full gap-5 items-center pr-5'>
              <span className='w-2/5'>Nome</span>
              <span className='w-1/5'>Telefone</span>
              <span className='w-1/5 overflow-auto'>Desfecho</span>
              <span className='w-1/5 overflow-auto'>Última Alteração</span>
              <span className='w-1/5'>Status</span>
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
