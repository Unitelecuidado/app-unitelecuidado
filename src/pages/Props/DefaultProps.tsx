import { AlertColor, SnackbarOrigin } from '@mui/material'

export interface Usuarios {
  id: number
  email: string
  senha: string
  cargo: string
  nome: string
  ativo: boolean
}

export interface NotificationProps {
  type: AlertColor
  message: string
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}
