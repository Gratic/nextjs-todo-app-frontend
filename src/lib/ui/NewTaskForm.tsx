import { useState } from "react";
import { Task } from "../datatypes";

export default function NewTaskForm({ onSubmit, onCancel } : { onSubmit: (task: Omit<Task, "id">) => void, onCancel: () => void }) {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        const data: Omit<Task, "id"> = {
            title: title.trim(),
            content: content.trim(),
        }

        onSubmit(data);

        setTitle("");
        setContent("");
    }

    return (
        <form onSubmit={handleSubmit} className="p-4 border-b border-gray-200">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task title"
                className="w-full p-2 mb-2 border rounded text-black"
                required
            />
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Task description (optional)"
                className="w-full p-2 mb-2 border rounded text-black"
                rows={3}
            />
            <div className="flex justify-end space-x-2">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded "
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                    Add Task
                </button>
            </div>
        </form>
    );
}