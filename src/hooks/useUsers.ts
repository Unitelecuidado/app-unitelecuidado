import axios, { AxiosPromise } from 'axios'
import { Usuarios } from './props'
import { useQuery } from '@tanstack/react-query'

const API_URL = 'http://localhost:8080'

const fetchData = /* async */ (): AxiosPromise<Usuarios[]> => {
  const response = axios.get(API_URL + '/usuarios')
  return response
}

export function useUsers() {
  const query = useQuery({
    queryFn: fetchData,
    queryKey: ['usuarios'],
    retry: 2,
  })

  return {
    ...query,
    data: query.data?.data,
  }
}
