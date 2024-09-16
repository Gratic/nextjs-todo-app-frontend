'use client';

import TaskCard from "@/lib/ui/TaskCard";
import { useSearchParams } from "next/navigation";
import { readCheckedStateFromParam } from "@/lib/utils";
import { getAllTasks } from "../task_rest_api";
import { createTask } from "../actions";
import { useState } from "react";
import NewTaskForm from "./NewTaskForm";
import { Task } from "../datatypes";


export default function ListOfTaskCards() {
    // const tasks = [
    //     { id: "id1", title: "title of 1", content: "content of 1", completedAt: null},
    //     { id: "id2", title: "title of 2", content: "content of 2", completedAt: null},
    //     { id: "id3", title: "title of 3", content: "content of 3", completedAt: '2024-09-15'},
    // ]

    const params = useSearchParams();
    const { tasks, isLoading, isError, mutate } = getAllTasks();
    const showCompleted = readCheckedStateFromParam(params, "showCompleted", true);
    const showTodo = readCheckedStateFromParam(params, "showTodo", true);
    const orderBy = params.get("order") ?? "chronologically";

    const [isAdding, setIsAdding] = useState(false);

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>An error occured.</p>;

    const showedTasks = tasks?.filter(task => (showCompleted && showTodo) || (showCompleted && task.completedAt) || (showTodo && !task.completedAt)) ?? [];
    
    if (orderBy === "reverse")
        showedTasks.reverse();

    async function createNewTask(newTask: Omit<Task, "id">) {
        const createdTask = await createTask(newTask);
        tasks?.push(createdTask) ?? [createdTask];
        mutate(tasks);

        setIsAdding(false);
    }

    return (
        <div className="bg-white bg-opacity-40 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
            { isAdding ? (
                <NewTaskForm onSubmit={createNewTask} onCancel={() => setIsAdding(false)} />
            ) : (
                <button 
                    onClick={() => setIsAdding(true)}
                    className="w-full p-4 text-indigo-600 hover:bg-indigo-50 transition-colors duration-300 flex items-center justify-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span className="ml-2">Add Task</span>
                </button>
            )}
            {showedTasks.map((task, index, arr) => 
                <TaskCard key={task.id} task={task} index={index} last={arr.length-1 === index} />
            )}
        </div>
    );
}