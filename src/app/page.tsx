'use client';

import CommandBar from "@/lib/ui/CommandBar";
import ListOfTaskCards from "@/lib/ui/ListOfTaskCards";
import { BiPlus } from "react-icons/bi";

export default function Home() {

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-8 font-sans">
            <main className="max-w-3xl mx-auto">

                {/* Header */}
                <div className="text-center mb-12 transform hover:scale-105 transition-transform duration-300">
                    <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-600 mb-3">Simple Task App</h1>
                    <p className="text-xl text-gray-600"><span className="italic">Let&apos;s have a productive day!</span> 😁</p>
                </div>

                {/* Command bar */}
                <CommandBar />

                {/* List of tasks */}
                <ListOfTaskCards />

                {/* Add task button */}
                <button className="mt-8 bg-gradient-to-r py-3 px-6 from-indigo-500 to-pink-600 text-white font-bold 
                rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 
                focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 
                flex items-center justify-center w-full sm:w-auto">
                    <BiPlus className="text-xl"/>
                    <span className="mr-2 text-xl">
                        Add Task
                    </span>
                </button>
                
            </main>
        </div>
      );
}
