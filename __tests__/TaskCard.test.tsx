import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskCard from '@/lib/ui/TaskCard';
import { Task } from '@/lib/datatypes';

let onUpdate = jest.fn();
let onDelete = jest.fn();

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

    describe("Base rendering", () => {
        it("Should display the title of the task", async () => {
            render(<TaskCard task={tasks[0]} index={0} last={false} onUpdate={onUpdate} onDelete={onDelete} />);
    
            const title = await screen.findByText("title of 1");
    
            expect(title).toBeInTheDocument();
        });
    
        it("Should display the title of the task striked when task is completed", async () => {
            render(<TaskCard task={tasks[1]} index={0} last={false} onUpdate={onUpdate} onDelete={onDelete} />);
    
            const title = await screen.findByText("title of 2");
    
            expect(title).toBeInTheDocument();
            expect(title.classList).toContain("line-through");
        });
    
        it("Should display a checkbox", async () => {
            render(<TaskCard task={tasks[0]} index={0} last={false} onUpdate={onUpdate} onDelete={onDelete} />);
    
            const completedCheckbox = await screen.findByRole('checkbox', { checked: false });
    
            expect(completedCheckbox).toBeInTheDocument();
        });

        it("Should display a button when there's a task content", async () => {
            let task = tasks[1];
            render(<TaskCard task={task} index={0} last={false} onUpdate={onUpdate} onDelete={onDelete} />);
    
            await screen.findByRole("button", { name: /show description/i })
        });
    
        it("Should not display a button when there's no task content", () => {
            let task = tasks[2];
            render(<TaskCard task={task} index={0} last={false} onUpdate={onUpdate} onDelete={onDelete} />);
    
            const btn = screen.queryByRole("button", { name: /show description/i });
            expect(btn).not.toBeInTheDocument();
        });
    
        it("Should display the content when the button is clicked given content", async () => {
            let task = tasks[0];
            render(<TaskCard task={task} index={0} last={false} onUpdate={onUpdate} onDelete={onDelete} />);
    
            const btn = await screen.findByRole("button", { name: /show description/i });
            fireEvent.click(btn);
    
            await waitFor(async () => {
                await screen.findByText("content of 1");
            })
        });
    });

    describe("CompletedAt Feature", () => {
        it("Should add the completedAt property when a task is completed", async () => {
            let task = tasks[0]
            render(<TaskCard task={task} index={0} last={false} onUpdate={onUpdate} onDelete={onDelete} />);
    
            expect(task.completedAt).toBeUndefined();
    
            const completedCheckbox = await screen.findByRole('checkbox', { checked: false });
            fireEvent.click(completedCheckbox);
    
            expect(onUpdate).toHaveBeenCalled();
            expect(task.completedAt).toBeDefined();
        });
    });

    describe("Editing task Feature", () => {
        it("Should display a edit button", async () => {
            render(<TaskCard task={tasks[0]} index={0} last={false} onUpdate={onUpdate} onDelete={onDelete} />);
    
            await screen.findByRole("button", { name: /edit/i });
        });

        it("Should not display valid edit button when nothing happened", () => {
            render(<TaskCard task={tasks[0]} index={0} last={false} onUpdate={onUpdate} onDelete={onDelete} />);
    
            const btn = screen.queryByRole("button", { name: /valid edit/i });
            expect(btn).not.toBeInTheDocument();
        });
    
        it("Should not display cancel edit button when nothing happened", () => {
            render(<TaskCard task={tasks[0]} index={0} last={false} onUpdate={onUpdate} onDelete={onDelete} />);
            
            const btn = screen.queryByRole("button", { name: /cancel edit/i });
            expect(btn).not.toBeInTheDocument();
        });
    
        it("Should display valid edit button when clicking on edit", async () => {
            render(<TaskCard task={tasks[0]} index={0} last={false} onUpdate={onUpdate} onDelete={onDelete} />);
    
            const editBtn = await screen.findByRole("button", { name: /edit/i });
            fireEvent.click(editBtn);
    
            await waitFor(async () => {
                await screen.findByRole("button", { name: /valid edit/i });
            })
        });
    
        it("Should display cancel edit button when clicking on edit", async () => {
            render(<TaskCard task={tasks[0]} index={0} last={false} onUpdate={onUpdate} onDelete={onDelete} />);
    
            const editBtn = await screen.findByRole("button", { name: /edit/i });
            fireEvent.click(editBtn);
    
            await waitFor(async () => {
                await screen.findByRole("button", { name: /cancel edit/i });
            })
        });

        it("Should not display editing title input when nothing happened", () => {
            render(<TaskCard task={tasks[0]} index={0} last={false} onUpdate={onUpdate} onDelete={onDelete} />);
    
            const input = screen.queryByRole("input[type=text]", { name: /edit title/i });
            expect(input).not.toBeInTheDocument();
        });
    
        it("Should display editing title input when edit btn is clicked", async () => {
            render(<TaskCard task={tasks[0]} index={0} last={false} onUpdate={onUpdate} onDelete={onDelete} />);
    
            const editBtn = await screen.findByRole("button", { name: /edit/i });
            fireEvent.click(editBtn);
    
            await waitFor(async () => {
                await screen.findByRole("textbox", { name: /edit title/i });
            })
        });
    
        it("Should display editing content textarea when edit btn is clicked", async () => {
            render(<TaskCard task={tasks[0]} index={0} last={false} onUpdate={onUpdate} onDelete={onDelete} />);
    
            const editBtn = await screen.findByRole("button", { name: /edit/i });
            fireEvent.click(editBtn);
    
            await waitFor(async () => {
                await screen.findByRole("textbox", { name: /edit content/i });
            })
        });

        it("Should return edit task information when valid edit btn is clicked", async () => {
            let task = tasks[0];
            render(<TaskCard task={task} index={0} last={false} onUpdate={onUpdate} onDelete={onDelete} />);

            const editBtn = await screen.findByRole("button", { name: /edit/i });
            fireEvent.click(editBtn);

            const editTitle = await screen.findByRole("textbox", { name: /edit title/i });
            const editContent = await screen.findByRole("textbox", { name: /edit content/i });

            fireEvent.change(editTitle, { target: {
                value: "new edited title"
            }});

            fireEvent.change(editContent, { target: {
                value: "new edited content"
            }});

            const validEditBtn = await screen.findByRole("button", { name: /valid edit/i })
            fireEvent.click(validEditBtn)

            expect(onUpdate).toHaveBeenCalled();
            expect(onUpdate).toHaveBeenCalledWith(task.id, {title: "new edited title", content: "new edited content"});
        });
    });

    describe("Delete task Feature", () => {
        it("Should display a delete button", async () => {
            render(<TaskCard task={tasks[0]} index={0} last={false} onUpdate={onUpdate} onDelete={onDelete} />);
    
            await screen.findByRole("button", { name: /delete/i });
        })

        it("Should not display a cancel delete button when nothing happened", () => {
            render(<TaskCard task={tasks[0]} index={0} last={false} onUpdate={onUpdate} onDelete={onDelete} />);
    
            const btn = screen.queryByRole("button", { name: /cancel delete/i });
            expect(btn).not.toBeInTheDocument();
        });

        it("Should not display a valid delete button when nothing happened", () => {
            render(<TaskCard task={tasks[0]} index={0} last={false} onUpdate={onUpdate} onDelete={onDelete} />);
    
            const btn = screen.queryByRole("button", { name: /valid delete/i });
            expect(btn).not.toBeInTheDocument();
        });

        it("Should display a cancel delete button when delete btn has been clicked", async () => {
            render(<TaskCard task={tasks[0]} index={0} last={false} onUpdate={onUpdate} onDelete={onDelete} />);
    
            const deleteBtn = await screen.findByRole("button", { name: /delete/i });
            fireEvent.click(deleteBtn);

            await screen.findByRole("button", { name: /cancel delete/i });
        });

        it("Should display a valid delete button when delete btn has been clicked", async () => {
            render(<TaskCard task={tasks[0]} index={0} last={false} onUpdate={onUpdate} onDelete={onDelete} />);
    
            const deleteBtn = await screen.findByRole("button", { name: /delete/i });
            fireEvent.click(deleteBtn);

            await screen.findByRole("button", { name: /valid delete/i });
        });

        it("Should call onDelete when valid delete button has been clicked", async () => {
            const task = tasks[0];
            render(<TaskCard task={task} index={0} last={false} onUpdate={onUpdate} onDelete={onDelete} />);
    
            const deleteBtn = await screen.findByRole("button", { name: /delete/i });
            fireEvent.click(deleteBtn);

            const validDeleteBtn = await screen.findByRole("button", { name: /valid delete/i });
            fireEvent.click(validDeleteBtn);

            expect(onDelete).toHaveBeenCalled();
            expect(onDelete).toHaveBeenCalledWith(task.id);
        });
    });
});