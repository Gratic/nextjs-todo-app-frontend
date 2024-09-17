import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskCard from '@/lib/ui/TaskCard';
import { Task } from '@/lib/datatypes';

describe("TaskCard", () => {

    let tasks : Task[] = [];

    beforeAll(() => {
        tasks = [
            {
                id: "1",
                title: "title of 1",
                content: "content of 1",
            },
            {
                id: "2",
                title: "title of 2",
                content: "content of 2",
                completedAt: "date of 2",
            },
        ]
    });

    it("Should display the title of the task", async () => {
        render(<TaskCard task={tasks[0]} index={0} last={false} />);

        const title = await screen.findByText("title of 1");

        expect(title).toBeInTheDocument();
    })

    it("Display the title of the task", async () => {
        render(<TaskCard task={tasks[1]} index={0} last={false} />);

        const title = await screen.findByText("title of 2");

        expect(title).toBeInTheDocument();
        expect(title.classList).toContain("line-through");
    })
});