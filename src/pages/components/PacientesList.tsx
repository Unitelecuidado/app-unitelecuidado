import { Delete, Edit } from '@mui/icons-material'
import Link from 'next/link'
import { deletarPaciente } from '../../../service/pacientesService'

import { useEffect, useState } from 'react'

import { format } from 'date-fns'
import { ModalComponents, Pacientes } from '../Props/DefaultProps'
import PacienteModal from './PacienteModal'

interface PropsPacienteList {
  paciente: Pacientes
}
const PacientesList = ({ paciente }: PropsPacienteList) => {
  const [activeModal, setActiveModal] = useState<boolean>(false)
  const [modalComponentName, setModalComponentName] = useState('')

  async function deletePacientes(id: number) {
    await deletarPaciente(id)
  }

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

  const valorEncaminhamento = (value: string) => {
    const nomeCorreto = allEncaminhamentos?.filter(encamin =>
      encamin.value.includes(value)
    )
    return nomeCorreto[0].nome
  }

  const openModal = (modalName: string) => {
    setActiveModal(true)
    setModalComponentName(modalName)
  }

  const chooseModal = (modalName: string) => {
    const components: ModalComponents = {
      PacienteModal: (
        <PacienteModal
          activeModal={activeModal}
          setActiveModal={setActiveModal}
          paciente={paciente}
        />
      ),
    }
    return components[modalName]
  }
  return (
    <>
      <div
        key={paciente.id}
        className='flex w-full justify-between items-center cursor-pointer px-5 py-4 rounded-md font-medium uppercase text-md text-padrao-blue'
      >
        <div
          className='flex w-full items-center'
          onClick={() => openModal('PacienteModal')}
        >
          <span className='w-2/5'>{paciente.nome}</span>
          <span className='w-1/5'>{paciente.telefone}</span>
          <span className='w-1/5'>
            {paciente.encaminhamento
              ? valorEncaminhamento(paciente.encaminhamento)
              : 'Não definido'}
          </span>
          <span className='w-1/5  hidden md:flex'>
            {paciente.ultima_alteracao
              ? format(new Date(paciente.ultima_alteracao), 'dd/MM/yyyy')
              : 'Não definido'}
          </span>
        </div>

        <span className='flex gap-3 items-centers'>
          <Link href={`/pacientes/editar/${paciente.id}`}>
            <Edit />
          </Link>
          <div
            onClick={() => deletePacientes(paciente.id)}
            className='cursor-pointer'
          >
            <Delete />
          </div>
        </span>
      </div>
      <hr></hr>
      {activeModal && chooseModal(modalComponentName)}
    </>
  )
}

export default PacientesList
