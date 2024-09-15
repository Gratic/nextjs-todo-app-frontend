import TaskCard from "@/lib/ui/TaskCard";

export default function ListOfTaskCards() {
    const tasks = [
        { id: "id1", title: "title of 1", content: "content of 1", completedAt: null},
        { id: "id2", title: "title of 2", content: "content of 2", completedAt: null},
        { id: "id3", title: "title of 3", content: "content of 3", completedAt: '2024-09-15'},
    ]

    return (
        <div className="bg-white bg-opacity-40 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
            {tasks.map((task, index, arr) => 
                <TaskCard task={task} index={index} last={arr.length-1 === index} />
            )}
        </div>
    );
}