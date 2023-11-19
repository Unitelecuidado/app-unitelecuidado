import Head from 'next/head'
import SearchBox from './components/SearchBox'
import { Pacientes } from './Props/DefaultProps'
import { useState, useEffect } from 'react'
import { getPacientes } from '../../service/pacientesService'
import PendenciasCard from './components/PendenciasCard'

const Pendencias = () => {
  const [pacientes, setPacientes] = useState<Pacientes[]>([])

  const [pacientesFiltrados, setPacientesFiltrados] = useState<
    Pacientes[]
  >([])
  const [buscando, setBuscando] = useState('')
  const [encaminhamento, setEncaminhamento] = useState<{
    nome: string
    value: string
  } | null>(null)

  useEffect(() => {
    getAllPacientes()
  }, [])

  async function getAllPacientes() {
    const data = await getPacientes()

    setPacientes(
      data
        ?.filter((paciente: Pacientes) =>
          paciente.status?.includes('EM_ANDAMENTO')
        )
        .sort((a: Pacientes, b: Pacientes) => {
          return a.nome.localeCompare(b.nome)
        })
    )
  }

  return (
    <>
      <Head>
        <title>Unitelecuidado</title>
      </Head>
      <div className='flex mx-16 py-16 flex-col gap-10'>
        <span className='font-semibold text-4xl text-padrao-blue  top-20 '>
          Pendências
        </span>
        <div>
          <SearchBox
            buscando={buscando}
            setBuscando={setBuscando}
            allPacientes={pacientes}
            setPacientesFiltrados={setPacientesFiltrados}
            isPendencias
            setEncaminhamento={setEncaminhamento}
          />
        </div>
        <div className='flex flex-col'>
          <div className=' flex flex-col max-h-full overflow-y-auto'>
            {buscando === '' && encaminhamento === null ? (
              pacientes.length ? (
                <div className='grid grid-cols-2 md:grid-cols-3 gap-12 '>
                  {pacientes.map(paciente => (
                    <PendenciasCard
                      key={paciente.id}
                      paciente={paciente}
                    />
                  ))}
                </div>
              ) : (
                <div className='flex justify-center p-20 gap-5 font-medium text-padrao-blue flex-col'>
                  <span className='flex justify-center text-3xl'>
                    Sem Pacientes Pendentes
                  </span>
                  <span className='flex justify-center text-lg '>
                    Verifique a lista de pacientes.
                  </span>
                </div>
              )
            ) : (buscando || encaminhamento) &&
              pacientesFiltrados.length ? (
              <div className='grid grid-cols-3 gap-12 '>
                {pacientesFiltrados.map(paciente => (
                  <PendenciasCard key={paciente.id} paciente={paciente} />
                ))}
              </div>
            ) : encaminhamento && pacientesFiltrados.length === 0 ? (
              <div className='flex justify-center p-20 gap-5 font-medium text-padrao-blue flex-col'>
                <span className='flex justify-center text-3xl'>
                  Sem pacientes para {encaminhamento.nome}
                </span>
                <span className='flex justify-center text-lg '>
                  Tente outro encaminhamento.
                </span>
              </div>
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

export default Pendencias
