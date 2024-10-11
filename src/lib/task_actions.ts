"use server";

import { Task } from "./datatypes";
import { join } from 'path';

const TASK_API_ENDPOINT = process.env.TASK_API_ENDPOINT ?? "http://localhost:8000/v1/tasks"

export async function createTask(newTask: Omit<Task, "id">) {
    const task = await fetch(
        TASK_API_ENDPOINT, 
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
        join(TASK_API_ENDPOINT, id), 
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
        join(TASK_API_ENDPOINT, id),
        {
            method: "DELETE",
        }
    )
}