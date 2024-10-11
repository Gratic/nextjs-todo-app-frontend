import useSWR, { Fetcher } from 'swr'
import { Task } from "./datatypes";

const TASK_API_ENDPOINT = process.env.TASK_API_ENDPOINT ?? "http://localhost:8000/v1/tasks"

const fetcherAllTasks: Fetcher<Task[], string> = () => fetch(TASK_API_ENDPOINT).then(res => res.json())

export function useFetchAllTasks () {
    const { data, error, isLoading, mutate } = useSWR(`/`, fetcherAllTasks)
   
    return {
      tasks: data,
      isLoading,
      isError: error,
      mutate
    }
}