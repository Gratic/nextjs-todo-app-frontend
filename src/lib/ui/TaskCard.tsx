'use client';

import { useState } from "react";
import { Task } from "../datatypes";
import { BiDetail, BiMinus } from "react-icons/bi";

export default function TaskCard({ task, index, last, onUpdate } : { task: Task, index: number, last: boolean, onUpdate: (id:string, newTasks:Partial<Task>) => Promise<void> }) {
    const [isOpen, setOpen] = useState(false);

    function onCheckboxClick() {
        if(!task.completedAt)
        {
            task.completedAt = new Date(Date.now()).toISOString();
        } else {
            task.completedAt = "";
        }

        onUpdate(task.id, task)
    }

    function onOpenClick() {
        if(!isOpen && task.content)
        {
            setOpen(true);
            return;
        }

        setOpen(false);
    }

    return  (
        <div
            className={`border-b border-gray-200 p-5 hover:bg-white hover:bg-opacity-60 transition-all duration-300 
                ${ index === 0 ? 'rounded-t-2xl' : ''}
                ${ last ? 'border-b-0 rounded-b-2xl' : '' } `}
        >
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <input type="checkbox"
                        checked={ task.completedAt ? true : false }
                        onChange={() => onCheckboxClick()}
                        className="form-checkbox h-6 w-6 text-indigo-600 rounded transition duration-150 ease-in-out" 
                    />
                    <p className={`font-medium text-lg ${ task.completedAt ? 'text-gray-500 line-through' :  'text-gray-800' } `}>
                        {task.title}
                    </p>
                </div>
                {
                    task.content ?
                <button
                    aria-label="show description"
                    className="text-indigo-500 hover:text-indigo-700 transition-colors duration-300"
                    onClick={() => onOpenClick()}
                >
                    <span className="font-semibold text-xl">{ isOpen ? <BiMinus /> : <BiDetail />}</span>
                </button> :
                <></>
                }
            </div>
            { isOpen ?
            <div className="bg-white rounded-xl p-2 mt-2 text-gray-500">
                { task.content }
            </div>
            : <></> }
        </div>
    );
}