import { Dispatch, SetStateAction } from 'react'
import { Pacientes } from '../Props/DefaultProps'
import { format } from 'date-fns'
import { Button } from '@mui/material'

interface PropsPacienteModal {
  activeModal: boolean
  setActiveModal: Dispatch<SetStateAction<boolean>>
  paciente: Pacientes
}

const PacienteModal = ({
  activeModal,
  setActiveModal,
  paciente,
}: PropsPacienteModal) => {
  const closeModal = () => {
    setActiveModal(false)
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

  const valorEncaminhamento = (value: string) => {
    const nomeCorreto = allEncaminhamentos?.filter(encamin =>
      encamin.value.includes(value)
    )
    return nomeCorreto[0].nome
  }

  const valorDesfecho = (value: string) => {
    const nomeCorreto = allDesfechos?.filter(desf =>
      desf.value.includes(value)
    )
    return nomeCorreto[0].nome
  }

  return (
    <div
      className='fixed top-0 left-0 flex items-center justify-center w-full h-full overflow-auto bg-black-shadow'
      onClick={closeModal}
    >
      <div
        className='bg-padrao-gray rounded-2xl m-10 shadow-md w-3/4 md:w-3/5 max-h-80% overflow-auto '
        onClick={e => e.stopPropagation()}
      >
        <>
          <header
            className={`flex flex-col w-full gap-10 p-14 border-b-2`}
          >
            <span className='text-4xl text-padrao-blue font-semibold capitalize'>
              {paciente?.nome}
            </span>
            <div className='flex w-full gap-14'>
              <div className='flex flex-col gap-3 w-1/2'>
                <span className='flex gap-2 items-center text-lg'>
                  <span className='text-padrao-blue font-medium '>
                    Telefone:
                  </span>
                  <span>{paciente?.telefone}</span>
                </span>
                <span className='flex gap-2 items-center text-lg'>
                  <span className='text-padrao-blue font-medium '>
                    CPF:
                  </span>
                  <span>{paciente?.cpf || 'Não informado'}</span>
                </span>
                <span className='flex gap-2 items-center text-lg'>
                  <span className='text-padrao-blue font-medium '>
                    CNS:
                  </span>
                  <span>{paciente?.cns || 'Não informado'}</span>
                </span>
              </div>
              <div className='flex flex-col gap-3 w-1/2'>
                <span className='flex gap-2 items-center text-lg'>
                  <span className='text-padrao-blue font-medium '>
                    Data de Nascimento:
                  </span>
                  <span>
                    {(paciente?.nascimento &&
                      format(
                        new Date(paciente?.nascimento),
                        'dd/MM/yyyy'
                      )) ||
                      'Não informado'}
                  </span>
                </span>
                <span className='flex gap-2 items-center text-lg'>
                  <span className='text-padrao-blue font-medium '>
                    Sexo:
                  </span>
                  <span>{paciente?.sexo || 'Não informado'}</span>
                </span>
                <span className='flex gap-2 items-baseline text-lg'>
                  <span className='text-padrao-blue font-medium '>
                    Endereço:
                  </span>
                  <span>{paciente?.endereco || 'Não informado'}</span>
                </span>
              </div>
            </div>
          </header>

          <section className='flex w-full p-14 gap-14'>
            <div className='flex flex-col gap-3 w-1/2'>
              <span className='text-2xl text-padrao-blue font-semibold capitalize mb-3'>
                Detalhamento
              </span>
              <span className='flex gap-2 items-center text-lg'>
                <span>{paciente?.detalhes || 'Não informado'}</span>
              </span>
              <span className='flex gap-2 items-center text-lg'>
                <span className='text-padrao-blue font-medium '>
                  Desfecho:
                </span>
                <span>
                  {(paciente?.desfecho &&
                    valorDesfecho(paciente.desfecho)) ||
                    'Não definido'}
                </span>
              </span>
              <span className='flex gap-2 items-baseline text-lg'>
                <span className='text-padrao-blue font-medium '>
                  Encaminhamento:
                </span>
                <span>
                  {(paciente?.encaminhamento &&
                    valorEncaminhamento(paciente?.encaminhamento)) ||
                    'Não definido'}
                </span>
              </span>
            </div>
            <div className='flex flex-col gap-3 w-1/2'>
              <span className='text-2xl text-padrao-blue font-semibold capitalize mb-3'>
                Observações
              </span>
              <div className='flex gap-64'>
                <div className='flex flex-col gap-3'>
                  <span className='flex gap-2 items-center text-lg'>
                    {paciente?.observacoes || 'Não informado'}
                  </span>

                  <span className='flex gap-2 items-baseline text-lg'>
                    <span className='text-padrao-blue font-medium '>
                      Origem:
                    </span>
                    <span>{paciente?.origem || 'Não definido'}</span>
                  </span>
                </div>
              </div>
            </div>
          </section>
          <footer className={`flex p-10 justify-end gap-10 items-center`}>
            <Button
              variant='contained'
              className={`bg-padrao-blue w-36 capitalize`}
              onClick={closeModal}
            >
              Fechar
            </Button>
          </footer>
        </>
      </div>
    </div>
  )
}

export default PacienteModal
