import useSWR, { Fetcher } from 'swr'
import { Task } from './datatypes'

const fetcherAllTasks: Fetcher<Task[], string> = () => fetch("http://localhost:8000/v1/tasks").then(res => res.json())

export function getAllTasks () {
    const { data, error, isLoading } = useSWR(`/`, fetcherAllTasks)
   
    return {
      tasks: data,
      isLoading,
      isError: error
    }
  }