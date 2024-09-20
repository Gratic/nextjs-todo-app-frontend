"use server";

import useSWR, { Fetcher } from 'swr'
import { Task } from "./datatypes";

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

export async function createTask(newTask: Omit<Task, "id">) {
    const task = await fetch(
        "http://localhost:8000/v1/tasks", 
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTask),
        })
        .then(res => res.json()) as Task;

    return task;
}

export async function updateTask(id:string, newTask: Partial<Task>) {
    const task = await fetch(
        `http://localhost:8000/v1/tasks/${id}`, 
        {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTask),
        }
    ).then(res => res.json()) as Task;

    return task;
}

export async function deleteTask(id:string) {
    await fetch(
        `http://localhost:8000/v1/tasks/${id}`,
        {
            method: "DELETE",
        }
    )
}