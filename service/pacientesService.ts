import axios from 'axios'

const axiosClient = axios.create()

axiosClient.defaults.baseURL = 'http://localhost:8080'

export async function getPacientes(URL: string) {
  try {
    const response = await axiosClient.get(URL)
    return response.data
  } catch (error) {
    console.log('Erro na requisição:', error)
    throw error
  }
}

export async function cadastrarPaciente(URL: string, payload: any) {
  const response = await axiosClient
    .post(URL, payload)
    .then(response => response)
    .catch(error => console.log('2', error))

  return response /* .data */
}

export async function putRequest(URL: string, payload: any) {
  const response = await axiosClient
    .put(URL, payload)
    .then(response => response)
    .catch(error => console.log('3', error))

  return response /* .data */
}

export async function deleteRequest(URL: string) {
  const response = await axiosClient
    .delete(URL)
    .then(response => response)
    .catch(error => console.log('4', error))

  return response /* .data */
}
