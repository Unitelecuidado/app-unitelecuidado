import { Alert, AlertTitle, Snackbar } from '@mui/material'
import React from 'react'
import { NotificationProps } from '../Props/DefaultProps'

const Notification = ({
  type,
  message,
  isOpen,
  setIsOpen,
}: NotificationProps) => {
  const handleChange = () => {
    setIsOpen(false)
  }

  const setAlertTitle = () => {
    if (type === 'error') {
      return <AlertTitle className='font-bold'> Erro </AlertTitle>
    } else if (type === 'success') {
      return <AlertTitle className='font-bold'> Sucesso </AlertTitle>
    } else if (type === 'warning') {
      return <AlertTitle className='font-bold'> Atenção </AlertTitle>
    }
  }

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      autoHideDuration={3000}
      open={isOpen}
      onClose={handleChange}
    >
      <Alert onClose={handleChange} severity={type} sx={{ width: '100%' }}>
        {setAlertTitle()}
        {message}
      </Alert>
    </Snackbar>
  )
}
export default Notification
