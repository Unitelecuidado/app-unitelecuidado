import { Alert, AlertTitle, Button, Snackbar } from '@mui/material'
import React from 'react'
import { NotificationProps } from '../Props/DefaultProps'

const Notification = ({
  type,
  message,
  isOpen,
  setIsOpen,
  isDelete,
  confirm,
  setConfirm,
}: NotificationProps) => {
  const handleChange = () => {
    setIsOpen(false)
  }
  const handleConfirm = () => {
    setConfirm && setConfirm(!confirm)
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
      autoHideDuration={isDelete ? null : 3000}
      open={isOpen}
      onClose={handleChange}
    >
      <Alert
        onClose={handleChange}
        severity={type}
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div className='flex flex-col justify-start'>
          {setAlertTitle()}
          {message}
          {isDelete && (
            <Button color='inherit' size='small' onClick={handleConfirm}>
              Confirmar
            </Button>
          )}
        </div>
      </Alert>
    </Snackbar>
  )
}
export default Notification
