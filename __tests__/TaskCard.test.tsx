import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskCard from '@/lib/ui/TaskCard';
import { Task } from '@/lib/datatypes';

let onUpdate = jest.fn();

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
            {
                id: "3",
                title: "title of 3",
                content: ""
            }
        ]
    });

    afterEach(() => {
        jest.resetAllMocks();
    })

    it("Should display the title of the task", async () => {
        render(<TaskCard task={tasks[0]} index={0} last={false} onUpdate={onUpdate} />);

        const title = await screen.findByText("title of 1");

        expect(title).toBeInTheDocument();
    });

    it("Should display the title of the task striked when task is completed", async () => {
        render(<TaskCard task={tasks[1]} index={0} last={false} onUpdate={onUpdate} />);

        const title = await screen.findByText("title of 2");

        expect(title).toBeInTheDocument();
        expect(title.classList).toContain("line-through");
    });

    it("Should display a checkbox", async () => {
        render(<TaskCard task={tasks[0]} index={0} last={false} onUpdate={onUpdate} />);

        const completedCheckbox = await screen.findByRole('checkbox', { checked: false });

        expect(completedCheckbox).toBeInTheDocument();
    });

    it("Should add the completedAt property when a task is completed", async () => {
        let task = tasks[0]
        render(<TaskCard task={task} index={0} last={false} onUpdate={onUpdate} />);

        expect(task.completedAt).toBeUndefined();

        const completedCheckbox = await screen.findByRole('checkbox', { checked: false });
        fireEvent.click(completedCheckbox);

        expect(onUpdate).toHaveBeenCalled();
        expect(task.completedAt).toBeDefined();
    });

    it("Should display a button when there's a task content", async () => {
        let task = tasks[1];
        render(<TaskCard task={task} index={0} last={false} onUpdate={onUpdate}/>);

        await screen.findByRole("button")
    });

    it("Should not display a button when there's no task content", () => {
        let task = tasks[2];
        render(<TaskCard task={task} index={0} last={false} onUpdate={onUpdate}/>);

        const btn = screen.queryByRole("button");
        expect(btn).not.toBeInTheDocument();
    });

    it("Should display the content when the button is clicked given content", async () => {
        let task = tasks[0];
        render(<TaskCard task={task} index={0} last={false} onUpdate={onUpdate} />)

        const btn = await screen.findByRole("button");
        fireEvent.click(btn);

        await waitFor(async () => {
            await screen.findByText("content of 1");
        })
    });
});