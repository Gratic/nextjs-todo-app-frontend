import type { Metadata } from 'next'
import CommandBar from "@/lib/ui/CommandBar";
import ListOfTaskCards from "@/lib/ui/ListOfTaskCards";
 
export const metadata: Metadata = {
  title: 'Simple Todo App',
  description: 'Web application for managing a simple todo list.',
}

export default function Home() {

    return (
        <main className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-8 font-sans">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12 transform hover:scale-105 transition-transform duration-300">
                    <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-600 mb-3">Simple Task App</h1>
                    <p className="text-xl text-gray-600"><span className="italic">Let&apos;s have a productive day!</span> 😁</p>
                </div>

                {/* Command bar */}
                <CommandBar />

                {/* List of tasks */}
                <ListOfTaskCards />
            </div>
        </main>
      );
}
