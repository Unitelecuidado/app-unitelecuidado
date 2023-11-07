import { Pacientes } from '@/pages/Props/DefaultProps'
import axios from 'axios'

const axiosClient = axios.create()

axiosClient.defaults.baseURL = 'http://localhost:8080'

export async function getPacientes() {
  try {
    const response = await axiosClient.get('/pacientes')
    return response.data
  } catch (error) {
    console.log('Erro na requisição:', error)
    throw error
  }
}

export async function getPacientesById(id: number) {
  try {
    const response = await axiosClient.get(`/pacientes/${id}`)
    return response.data
  } catch (error) {
    console.log('Erro na requisição:', error)
    throw error
  }
}

export async function cadastrarPaciente(payload: any) {
  const response = await axiosClient
    .post('/pacientes', payload)
    .then(response => response)
    .catch(error => console.log('2', error))

  return response
}

export async function editarPaciente(payload: any) {
  const response = await axiosClient
    .put('/pacientes', payload)
    .then(response => response)
    .catch(error => console.log('3', error))

  return response
}

export async function deletarPaciente(id: number) {
  const response = await axiosClient
    .delete(`/pacientes/${id}`)
    .then(response => response)
    .catch(error => console.log('4', error))

  return response
}
