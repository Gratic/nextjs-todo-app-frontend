'use client';

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { readCheckedStateFromParam } from "@/lib/utils";

export default function CommandBar() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    
    const [selectValue, setSelectValue] = useState(searchParams.get("order") ?? "chronological");

    const [showCompleted, setShowCompleted] = useState(readCheckedStateFromParam(searchParams, "showCompleted"));
    const [showTodo, setShowTodo] = useState(readCheckedStateFromParam(searchParams, "showTodo"));

    function handleOrderChange(value: string) {
        const params = new URLSearchParams(searchParams)

        setSelectValue(value);
        params.set("order", value);

        replace(`${pathname}?${params.toString()}`);
    }

    function handleShowCompletedChange() {
        const params = new URLSearchParams(searchParams)

        setShowCompleted(!showCompleted);
        params.set("showCompleted", String(!showCompleted));

        replace(`${pathname}?${params.toString()}`);
    }

    function handleShowTodoChange() {
        const params = new URLSearchParams(searchParams)

        setShowTodo(!showTodo);
        params.set("showTodo", String(!showTodo));

        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div className="bg-white bg-opacity-40 backdrop-blur-xl rounded-2xl shadow-xl
            p-6 mb-8
            flex flex-col sm:flex-row justify-between items-center
            transition-all duration-300 hover:shadow-2xl">
            <div className="mb-4 sm:mb-0">
                <label htmlFor="order" className="mr-3 text-gray-700 font-medium">
                    Order by:
                </label>
                <select 
                    name="order" 
                    id="order" 
                    className="form-select bg-white bg-opacity-50 border border-gray-300 text-gray-700 py-2 pl-4 pr-8 rounded-lg focus-ring-indigo-500 transition-all duration-300"
                    onChange={e => handleOrderChange(e.currentTarget.value)}
                    value={selectValue}
                >
                    <option value="chronologically">Chronologically</option>
                    <option value="reverse">Reverse</option>
                </select>
            </div>

            <div className="flex space-x-6">
                <div className="flex items-center">
                    <input 
                        type="checkbox"
                        id="completed"
                        className="form-checkbox h-5 w-5 text-indigo-600 rounded transition duration-150 ease-in-out"
                        checked={showCompleted}
                        onChange={() => handleShowCompletedChange()}
                    />
                    <label htmlFor="completed" className="ml-2 text-gray-700">
                        Completed
                    </label>
                </div>

                <div className="flex items-center">
                    <input type="checkbox"
                        id="todo"
                        className="form-checkbox h-5 w-5 text-indigo-600 rounded transition duration-150 ease-in-out"
                        checked={showTodo}
                        onChange={() => handleShowTodoChange()}
                    />
                    <label htmlFor="todo" className="ml-2 text-gray-700">
                        Todo
                    </label>
                </div>
            </div>
        </div>
    );
}