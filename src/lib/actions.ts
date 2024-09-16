"use server";

import { Task } from "./datatypes";

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
        })
        .then(res => res.json()) as Task;

    return task;
}