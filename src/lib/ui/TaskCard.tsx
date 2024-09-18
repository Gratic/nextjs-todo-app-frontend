'use client';
import { useState } from "react";
import { Task } from "../datatypes";
import { BiDetail } from "react-icons/bi";
import { updateTask } from "../actions";

export default function TaskCard({ task, index, last } : { task: Task, index: number, last: boolean }) {
    const [completed, setCompleted] = useState(Boolean(task.completedAt));
    const [stateTask, setTask] = useState(task);

    function onCheckboxClick() {
        setCompleted(!completed);
        
        if(!completed)
        {
            task.completedAt = new Date(Date.now()).toISOString();
        } else {
            task.completedAt = "";
        }

        updateTask(task.id, task);
        setTask(task);
    }

    return  (
        <div
            className={`border-b border-gray-200 p-5 flex justify-between items-center hover:bg-white hover:bg-opacity-60 transition-all duration-300 
                ${ index === 0 ? 'rounded-t-2xl' : ''}
                ${ last ? 'border-b-0 rounded-b-2xl' : '' } `}
        >
            <div className="flex items-center space-x-4">
                <input type="checkbox"
                    checked={ stateTask.completedAt ? true : false }
                    onChange={() => onCheckboxClick()}
                    className="form-checkbox h-6 w-6 text-indigo-600 rounded transition duration-150 ease-in-out" 
                />
                <p className={`font-medium text-lg ${ stateTask.completedAt ? 'text-gray-500 line-through' :  'text-gray-800' } `}>
                    {stateTask.title}
                </p>
            </div>
            <button className="text-indigo-500 hover:text-indigo-700 transition-colors duration-300">
                <span className="font-semibold text-xl"><BiDetail /></span>
            </button>
        </div>
    );
}