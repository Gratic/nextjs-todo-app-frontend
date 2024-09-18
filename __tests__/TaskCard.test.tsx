import { createEvent, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskCard from '@/lib/ui/TaskCard';
import { Task } from '@/lib/datatypes';
import { updateTask } from '@/lib/actions';

jest.mock("@/lib/actions", () => ({
    updateTask: jest.fn().mockReturnValue(1)
}))

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

    afterEach(() => {
        jest.resetAllMocks();
    })

    it("Should display the title of the task", async () => {
        render(<TaskCard task={tasks[0]} index={0} last={false} />);

        const title = await screen.findByText("title of 1");

        expect(title).toBeInTheDocument();
    });

    it("Should display the title of the task striked when task is completed", async () => {
        render(<TaskCard task={tasks[1]} index={0} last={false} />);

        const title = await screen.findByText("title of 2");

        expect(title).toBeInTheDocument();
        expect(title.classList).toContain("line-through");
    });

    it("Should display a checkbox", async () => {
        let task = tasks[0];
        render(<TaskCard task={task} index={0} last={false}/>);

        const completedCheckbox = await screen.findByRole('checkbox', { checked: false });

        expect(completedCheckbox).toBeInTheDocument();
    });

    it("Should add the completedAt property when a task is completed", async () => {
        let task = tasks[0]
        render(<TaskCard task={task} index={0} last={false}/>);

        expect(task.completedAt).toBeUndefined();

        const completedCheckbox = await screen.findByRole('checkbox', { checked: false });
        fireEvent.click(completedCheckbox);

        expect(updateTask).toHaveBeenCalled();
        expect(task.completedAt).toBeDefined();
    });
});