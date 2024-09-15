export default function CommandBar() {
    return (
        <div className="bg-white bg-opacity-40 backdrop-blur-xl rounded-2xl shadow-xl
            p-6 mb-8
            flex flex-col sm:flex-row justify-between items-center
            transition-all duration-300 hover:shadow-2xl">
            <div className="mb-4 sm:mb-0">
                <label htmlFor="order" className="mr-3 text-gray-700 font-medium">
                    Order by:
                </label>
                <select name="order" id="order" className="form-select bg-white bg-opacity-50 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg focus-ring-indigo-500 transition-all duration-300">
                    <option value="">Chronologically</option>
                    <option value="">Reverse</option>
                </select>
            </div>

            <div className="flex space-x-6">
                <div className="flex items-center">
                    <input 
                        type="checkbox"
                        name="showCompleted"
                        id="completed"
                        className="form-checkbox h-5 w-5 text-indigo-600 rounded transition duration-150 ease-in-out"
                    />
                    <label htmlFor="completed" className="ml-2 text-gray-700">
                        Completed
                    </label>
                </div>

                <div className="flex items-center">
                    <input type="checkbox"
                        name="showTodo"
                        id="todo"
                        className="form-checkbox h-5 w-5 text-indigo-600 rounded transition duration-150 ease-in-out"
                    />
                    <label htmlFor="todo" className="ml-2 text-gray-700">
                        Todo
                    </label>
                </div>
            </div>
        </div>
    );
}