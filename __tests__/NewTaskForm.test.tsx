import { fireEvent, render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import NewTaskForm from "@/lib/ui/NewTaskForm"

const onSubmit = jest.fn();
const onCancel = jest.fn(); 

describe("New Task form tests", () => {
    it("Should render a form", async () => {
        render(<NewTaskForm onSubmit={onSubmit} onCancel={onCancel}/>)

        await screen.findByRole("textbox", { name: /adding title/i });
        await screen.findByRole("textbox", { name: /adding content/i });
        await screen.findByRole("button", { name: /valid adding/i });
        await screen.findByRole("button", { name: /cancel adding/i });
    });

    it("Should render empty", async () => {
        render(<NewTaskForm onSubmit={onSubmit} onCancel={onCancel}/>)

        const title = await screen.findByRole("textbox", { name: /adding title/i }) as HTMLInputElement;
        const content = await screen.findByRole("textbox", { name: /adding content/i }) as HTMLTextAreaElement;

        expect(title.value).toBeFalsy();
        expect(content.value).toBeFalsy();
    });

    it("Should call onSubmit when valid addition is clicked", async () => {
        render(<NewTaskForm onSubmit={onSubmit} onCancel={onCancel}/>)

        const title = await screen.findByRole("textbox", { name: /adding title/i }) as HTMLInputElement;
        const content = await screen.findByRole("textbox", { name: /adding content/i }) as HTMLTextAreaElement;
        const validBtn = await screen.findByRole("button", { name: /valid adding/i });

        act(() => {
            fireEvent.change(title, {target: { value: "new adding title" } });
            fireEvent.change(content, {target: { value: "new adding content" } });

            fireEvent.click(validBtn);
        });

        expect(onSubmit).toHaveBeenCalled();
        expect(onSubmit).toHaveBeenCalledWith({ title: "new adding title", content: "new adding content" });
    });

    it("Should call onCancel when cancel addition is clicked", async () => {
        render(<NewTaskForm onSubmit={onSubmit} onCancel={onCancel}/>)

        const title = await screen.findByRole("textbox", { name: /adding title/i }) as HTMLInputElement;
        const content = await screen.findByRole("textbox", { name: /adding content/i }) as HTMLTextAreaElement;
        const cancelBtn = await screen.findByRole("button", { name: /cancel adding/i });

        act(() => {
            fireEvent.click(cancelBtn);
        });

        expect(onCancel).toHaveBeenCalled();
    });
});