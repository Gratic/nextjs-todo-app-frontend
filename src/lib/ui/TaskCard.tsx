'use client';
import { Task } from "./datatypes";
import { BiDetail } from "react-icons/bi";


export default function TaskCard({ task, index, last } : { task: Task, index: number, last: boolean }) {
    function onCheckboxClick(id: string) {
        console.log("Clicked on " + id);
    }

    return  (
        <div
            key={task.id}
            className={`border-b border-gray-200 p-5 flex justify-between items-center hover:bg-white hover:bg-opacity-60 transition-all duration-300 
                ${ index === 0 ? 'rounded-t-2xl' : ''}
                ${ last ? 'border-b-0 rounded-b-2xl' : '' } `}
        >
            <div className="flex items-center space-x-4">
                <input type="checkbox"
                    checked={ task.completedAt ? true : false }
                    className="form-checkbox h-6 w-6 text-indigo-600 rounded transition duration-150 ease-in-out" 
                />
                <p className={`font-medium text-lg ${ task.completedAt ? 'text-gray-500 line-through' :  'text-gray-800' } `}>
                    {task.title}
                </p>
            </div>
            <button className="text-indigo-500 hover:text-indigo-700 transition-colors duration-300">
                <span className="font-semibold">Details</span>
            </button>
        </div>
    );
}