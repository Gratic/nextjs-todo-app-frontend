'use client';

import TaskCard from "@/lib/ui/TaskCard";
import { useSearchParams } from "next/navigation";
import { readCheckedStateFromParam } from "@/lib/utils";

export default function ListOfTaskCards() {
    const tasks = [
        { id: "id1", title: "title of 1", content: "content of 1", completedAt: null},
        { id: "id2", title: "title of 2", content: "content of 2", completedAt: null},
        { id: "id3", title: "title of 3", content: "content of 3", completedAt: '2024-09-15'},
    ]

    const params = useSearchParams();

    const showCompleted = readCheckedStateFromParam(params, "showCompleted", true);
    const showTodo = readCheckedStateFromParam(params, "showTodo", true);
    const orderBy = params.get("order") ?? "chronologically";

    const showedTasks = tasks
        .filter(task => (showCompleted && showTodo) || (showCompleted && task.completedAt) || (showTodo && !task.completedAt));
    
    if (orderBy === "reverse")
        showedTasks.reverse();

    return (
        <div className="bg-white bg-opacity-40 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
            {showedTasks.map((task, index, arr) => 
                <TaskCard task={task} index={index} last={arr.length-1 === index} />
            )}
        </div>
    );
}