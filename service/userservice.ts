import axios from 'axios'

const axiosClient = axios.create()

axiosClient.defaults.baseURL = 'http://localhost:8080'

export async function getUser() {
  try {
    const response = await axiosClient.get('/usuarios')
    return response.data
  } catch (error) {
    console.log('Erro na requisição:', error)
    throw error
  }
}

export async function createUser(payload: any) {
  const response = await axiosClient
    .post('/usuarios', payload)
    .then(response => response)
    .catch(error => console.log('2', error))

  return response
}

export async function updateUser(payload: any) {
  const response = await axiosClient
    .put('/usuarios', payload)
    .then(response => response)
    .catch(error => console.log('3', error))

  return response
}

export async function deleteUser(id: number) {
  const response = await axiosClient
    .delete('/usuarios')
    .then(response => response)
    .catch(error => console.log('4', error))

  return response
}
