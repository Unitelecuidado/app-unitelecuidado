import Link from 'next/link'
import { Pacientes } from '../Props/DefaultProps'

interface PropsPendenciasCard {
  paciente: Pacientes
}

const PendenciasCard = ({ paciente }: PropsPendenciasCard) => {
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
      nome: 'PAAS ',
      value: 'PAAS',
    },
  ]

  const valorEncaminhamento = (value: string) => {
    const nomeCorreto = allEncaminhamentos?.filter(encamin =>
      encamin.value.includes(value)
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

  const valorStatus = (value: string) => {
    const nomeCorreto = allStatus?.filter(status =>
      status.value.includes(value)
    )
    return nomeCorreto[0].nome
  }

  return (
    <Link href={`/pacientes/editar/${paciente.id}`}>
      <div className='flex w-full flex-col justify-between bg-padrao-gray rounded-lg p-5 gap-8 cursor-pointer h-60'>
        <div className='flex flex-col gap-1 overflow-hidden whitespace-nowrap'>
          <span className='text-padrao-blue font-medium text-xl overflow-ellipsis'>
            {paciente.nome}
          </span>
          <span className='flex gap-2 items-center '>
            <span className='text-padrao-blue font-medium '>
              Telefone:
            </span>
            <span>{paciente?.telefone || 'Não informado'}</span>
          </span>
          <span className='flex gap-2 items-center '>
            <span className='text-padrao-blue font-medium '>CPF:</span>
            <span>{paciente?.cpf || 'Não informado'}</span>
          </span>
          <span className='flex gap-2 items-center'>
            <span className='text-padrao-blue font-medium '>CNS:</span>
            <span>{paciente?.cns || 'Não informado'}</span>
          </span>
        </div>
        <div className='flex justify-between items-end'>
          <span className=' text-padrao-blue font-medium text-lg max-w-170'>
            {paciente.encaminhamento
              ? valorEncaminhamento(paciente.encaminhamento)
              : 'Não definido'}
          </span>
          <span className='flex items-center gap-3'>
            <span
              className={'bg-padrao-yellow flex rounded-full w-3 h-3'}
            />
            {paciente.status && valorStatus(paciente.status)}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default PendenciasCard
