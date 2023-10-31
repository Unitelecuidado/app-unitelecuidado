import Head from 'next/head'
import { useEffect, useState } from 'react'
import { getPacientes } from '../../service/pacientesService'
import { Pacientes } from './Props/DefaultProps'
import { Delete, Edit } from '@mui/icons-material'

const Pacientes = () => {
  const [pacientes, setPacientes] = useState<Pacientes[]>([])
  useEffect(() => {
    getAllPacientes()
  }, [])

  async function getAllPacientes() {
    const data = await getPacientes('/pacientes')
    setPacientes(data)
  }

  console.log(pacientes)

  return (
    <>
      <Head>
        <title>Unitelecuidado</title>
      </Head>
      <div className='flex mx-16 py-16 flex-col gap-10'>
        <span className='font-semibold text-4xl text-padrao-blue  top-20 absolute'>
          Lista de Pacientes
        </span>
        <div>Busca</div>
        <div className='flex flex-col'>
          <div className='flex w-full justify-between items-center px-5 py-2 rounded-md font-medium uppercase text-md bg-padrao-gray text-padrao-gray-dark'>
            <span className='w-2/6'>Nome</span>
            <span className='w-1/6'>Telefone</span>
            <span className='w-1/6'>Encaminhamento</span>
            <span className='w-1/6'>Última Alteração</span>
            <span>Opções</span>
          </div>
          <div>
            {pacientes.map(paciente => (
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
                  <span className='w-1/6'>{paciente.telefone}</span>
                  <span className='flex gap-3'>
                    <Edit />
                    <Delete />
                  </span>
                </div>
                <hr></hr>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Pacientes
