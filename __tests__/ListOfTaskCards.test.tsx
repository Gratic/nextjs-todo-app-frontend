import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Task } from '@/lib/datatypes';
import ListOfTaskCards from '@/lib/ui/ListOfTaskCards';
import { act } from 'react';

let tasks: Array<Task> = [];

jest.mock('next/navigation', () => {
    return {
      __esModule: true,
      usePathname: () => ({
        pathname: '',
      }),
      useRouter: () => ({
        push: jest.fn(),
        replace: jest.fn(),
        prefetch: jest.fn(),
      }),
      useSearchParams: () => {
        const get = (key: string) => {
          if (key === "showCompleted") return "false";
          if (key === "showTodo") return "true";
          if (key === "order") return "chronologically";
          return null;
        }
        return { get }
    },
}});

jest.mock('@/lib/task_rest_api', () => ({
    getAllTasks: jest.fn().mockImplementation(() => {
        return {
            tasks: [...tasks], // /!\ Has to be a new instanciation to properly trigger rerendering (surely due to useMemo)
            isLoading: false,
            isError: false,
            mutate: jest.fn(),
        }
    }),
}));

jest.mock("@/lib/actions", () => ({
    updateTask: jest.fn()
}))

describe("List of Task Cards tests", () => {
    beforeEach(() => {
        tasks = [
            {
                id: "id of 1",
                title: "title of 1",
                content: "",
            },
            {
                id: "id of 2",
                title: "title of 2",
                content: "",
                completedAt: "random date",
            }
        ];

        jest.clearAllMocks();
    })

    it("Should display only incomplete tasks when show completed is turned off", () => {
        render(<ListOfTaskCards />)

        const notCompletedTask = screen.queryByText("title of 1");
        expect(notCompletedTask).toBeVisible()

        const completedTask = screen.queryByText("title of 2");
        expect(completedTask).not.toBeInTheDocument()
    });

    it("Should not display completed task when completed is turn off and a task has just been completed", async () => {
        render(<ListOfTaskCards />)
        const toBeCompletedTask = await screen.findByText("title of 1");
        expect(toBeCompletedTask).toBeInTheDocument();

        const checkboxElement = toBeCompletedTask.parentElement?.querySelector('input[type=checkbox]');
        expect(checkboxElement).toBeInTheDocument();

        await act(async () => {
            fireEvent.click(checkboxElement!);
        });
        
        const completedTask = screen.queryByText("title of 1");
        expect(completedTask).not.toBeInTheDocument();
    });
});