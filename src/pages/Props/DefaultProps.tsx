import { AlertColor, SnackbarOrigin } from '@mui/material'

export interface Usuarios {
  id: number
  email: string
  senha: string
  cargo: string
  nome: string
  ativo: boolean
}

export interface Pacientes {
  id: number
  nome: string
  telefone: string
  cpf?: string
  desfecho?: string
  encaminhamento?: string
  nascimento?: string
  observacoes?: string
  sexo?: string
  ultima_alteracao?: string
  ativo: boolean
}

export interface NotificationProps {
  type: AlertColor
  message: string
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}
