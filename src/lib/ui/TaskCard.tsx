'use client';

import { ChangeEvent, useState } from "react";
import { Task } from "../datatypes";
import { BiCheck, BiDetail, BiMinus, BiPencil, BiTrash, BiX } from "react-icons/bi";
import { Conditional } from "@/lib/ui/Conditional";

export default function TaskCard({ task, index, last, onUpdate, onDelete } : { task: Task, index: number, last: boolean, onUpdate: (id:string, newTasks:Partial<Task>) => Promise<void>, onDelete: (id:string) => Promise<void> }) {
    const [isOpen, setOpen] = useState(false);
    const [isEdit, setEdit] = useState(false);
    const [editTask, setEditTask] = useState({ title: task.title, content: task.content} as Partial<Task>)
    const [isDelete, setDelete] = useState(false);

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

    function onEditTitle(e : ChangeEvent<HTMLInputElement>) {
        setEditTask({...editTask, title: e.target.value})
    }

    function onEditContent(e : ChangeEvent<HTMLTextAreaElement>) {
        setEditTask({...editTask, content: e.target.value})
    }

    function onValidEdit() {
        onUpdate(task.id, editTask);
        setEdit(false);
    }

    const showButtons = !(isEdit || isDelete)

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
                    <Conditional condition={!isEdit}>
                        <p className={`font-medium text-lg ${ task.completedAt ? 'text-gray-500 line-through' :  'text-gray-800' } `}>
                            {task.title}
                        </p>
                    </Conditional>
                    <Conditional condition={isEdit}>
                        <input
                            aria-label="edit title"
                            type="text"
                            className="form-input text-black rounded border-gray-200"
                            value={editTask.title}
                            onChange={e => onEditTitle(e)}
                        />
                    </Conditional>
                </div>
                <Conditional condition={Boolean(task.completedAt)}>
                    <p className="font-medium text-gray-500">{ new Date(task.completedAt!).toLocaleString() }</p>
                </Conditional>
                <Conditional condition={showButtons}>
                    <div>
                        <Conditional condition={Boolean(task.content)}>
                            <button
                                aria-label="show description"
                                className="text-indigo-500 hover:text-indigo-700 transition-colors duration-300"
                                onClick={() => onOpenClick()}
                            >
                                <span className="font-semibold text-xl">{ isOpen ? <BiMinus /> : <BiDetail />}</span>
                            </button>
                        </Conditional>
                        <button
                            aria-label="edit"
                            className="ml-2 text-indigo-500 hover:text-indigo-700 transition-colors duration-300"
                            onClick={() => setEdit(true)}
                        >
                            <span className="font-semibold text-xl"><BiPencil /></span>
                        </button>
                        <button
                            aria-label="delete"
                            className="ml-2 text-red-500 hover:text-red-700 transition-colors duration-300"
                            onClick={() => {setDelete(true)}}
                        >
                            <span className="font-semibold text-xl"><BiTrash /></span>
                        </button>
                    </div>
                </Conditional>
                <Conditional condition={isEdit}>
                    <div>
                        <button
                            aria-label="valid edit"
                            className="ml-2 text-green-500 hover:text-green-700 transition-colors duration-300"
                            onClick={() => onValidEdit()}
                        >
                            <span className="font-semibold text-xl"><BiCheck /></span>
                        </button>
                        <button
                            aria-label="cancel edit"
                            className="ml-2 text-red-500 hover:text-red-700 transition-colors duration-300"
                            onClick={() => setEdit(false)}
                        >
                            <span className="font-semibold text-xl"><BiX /></span>
                        </button>
                    </div>
                </Conditional>
                <Conditional condition={isDelete}>
                    <div>
                        <button
                            aria-label="valid delete"
                            className="ml-2 text-green-500 hover:text-green-700 transition-colors duration-300"
                            onClick={() => onDelete(task.id)}
                        >
                            <span className="font-semibold text-xl"><BiCheck /></span>
                        </button>
                        <button
                            aria-label="cancel delete"
                            className="ml-2 text-red-500 hover:text-red-700 transition-colors duration-300"
                            onClick={() => setDelete(false)}
                        >
                            <span className="font-semibold text-xl"><BiX /></span>
                        </button>
                    </div>
                </Conditional>
            </div>
            <Conditional condition={isOpen}>
            <div className="bg-white rounded-xl p-2 mt-2 text-gray-500">
                { task.content }
            </div>
            </Conditional>
            <Conditional condition={isEdit}>
                <textarea
                    value={editTask.content}
                    aria-label="edit content"
                    onChange={e => onEditContent(e)}
                    placeholder="Task description (optional)"
                    className="w-full p-2 mt-2 border rounded text-black"
                    rows={3}
                />
            </Conditional>
        </div>
    );
}