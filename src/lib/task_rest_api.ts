import useSWR, { Fetcher } from 'swr'
import { Task } from './datatypes'

const fetcherAllTasks: Fetcher<Task[], string> = () => fetch("http://localhost:8000/v1/tasks").then(res => res.json())

export function useFetchAllTasks () {
    const { data, error, isLoading, mutate } = useSWR(`/`, fetcherAllTasks)
   
    return {
      tasks: data,
      isLoading,
      isError: error,
      mutate
    }
}