import { Delete, Edit } from '@mui/icons-material'
import Link from 'next/link'
import { deletarPaciente } from '../../../service/pacientesService'

import { useEffect, useState } from 'react'

import { format } from 'date-fns'
import { ModalComponents, Pacientes } from '../Props/DefaultProps'
import PacienteModal from './PacienteModal'
import Notification from './Notification'
import { AlertColor } from '@mui/material'

interface PropsPacienteList {
  paciente: Pacientes
  setLoading: (value: boolean) => void
  loading: boolean
}

const PacientesList = ({
  paciente,
  setLoading,
  loading,
}: PropsPacienteList) => {
  const [activeModal, setActiveModal] = useState<boolean>(false)
  const [modalComponentName, setModalComponentName] = useState('')
  const [state, setState] = useState(false)
  const [isValid, setIsValid] = useState<boolean>(false)
  const [message, setMessage] = useState('')
  const [type, setType] = useState<AlertColor>('error')
  const [confirm, setConfirm] = useState<boolean>(false)

  async function deletePacientes() {
    setIsValid(true)
    setState(true)
    setType('error')
    setMessage('Você realmente deseja excluir este paciente?')
  }

  const deletar = async (id: number) => {
    if (confirm) {
      if (await deletarPaciente(id)) {
        setLoading(!loading)
      }
    }
  }

  useEffect(() => {
    deletar(Number(paciente.id))
  }, [confirm])

  const allDesfechos = [
    { nome: 'Atendido', value: 'ATENDIDO' },
    { nome: 'Não disponível', value: 'NAO_DISPONIVEL' },
    { nome: 'Não ligar', value: 'NAO_LIGAR' },
    { nome: 'Não atendeu a ligação', value: 'NAO_ATENDEU_LIGACAO' },
    { nome: 'Telefone incorreto', value: 'TELEFONE_INCORRETO' },
  ]

  const valorDesfechos = (value: string) => {
    const nomeCorreto = allDesfechos?.filter(desfecho =>
      desfecho.value.includes(value)
    )
    return nomeCorreto[0].nome
  }

  const allStatus = [
    {
      nome: 'Não Iniciado ',
      value: 'NAO_INICIADO',
    },
    { nome: 'Concluído', value: 'CONCLUIDO' },
    { nome: 'Em Andamento', value: 'EM_ANDAMENTO' },
  ]
  const backgroundColor = () => {
    if (paciente.status === 'NAO_INICIADO') {
      return 'bg-padrao-red'
    } else if (paciente.status === 'EM_ANDAMENTO') {
      return 'bg-padrao-yellow'
    } else {
      return 'bg-padrao-green'
    }
  }

  const valorStatus = (value: string) => {
    const nomeCorreto = allStatus?.filter(status =>
      status.value.includes(value)
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
          className='flex w-full items-center gap-5 pr-5'
          onClick={() => openModal('PacienteModal')}
        >
          <span className='w-2/5'>{paciente.nome}</span>
          <span className='w-1/5'>{paciente.telefone}</span>
          <span className='w-1/5'>
            {paciente.desfecho
              ? valorDesfechos(paciente.desfecho)
              : 'Não definido'}
          </span>
          <span className='w-1/5  hidden md:flex'>
            {paciente.ultima_alteracao
              ? format(new Date(paciente.ultima_alteracao), 'dd/MM/yyyy')
              : 'Não definido'}
          </span>
          <span className='w-1/5 flex items-center gap-3'>
            <span
              className={` ${backgroundColor()} flex rounded-full w-3 h-3`}
            />
            {paciente.status && valorStatus(paciente.status)}
          </span>
        </div>

        <span className='flex gap-3 items-centers'>
          <Link href={`/pacientes/editar/${paciente.id}`}>
            <Edit />
          </Link>
          <div
            onClick={() => deletePacientes()}
            className='cursor-pointer'
          >
            <Delete />
          </div>
        </span>
      </div>
      {isValid ? (
        <Notification
          type={type}
          message={message}
          isOpen={state}
          setIsOpen={setState}
          isDelete
          setConfirm={setConfirm}
          confirm={confirm}
        ></Notification>
      ) : null}

      <hr></hr>
      {activeModal && chooseModal(modalComponentName)}
    </>
  )
}

export default PacientesList
