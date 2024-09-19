import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Task } from '@/lib/datatypes';
import ListOfTaskCards from '@/lib/ui/ListOfTaskCards';
import { act } from 'react';

let tasks: Array<Task> = [];
let mockSearchParams: jest.Mock;

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
      useSearchParams: () => mockSearchParams(),
}});

jest.mock('@/lib/task_rest_api', () => ({
    useFetchAllTasks: jest.fn().mockImplementation(() => {
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

function createMockSearchParams({showCompleted, showTodo, order} : {showCompleted: boolean, showTodo: boolean, order: "chronologically" | "reverse"}) {
    return jest.fn().mockReturnValue({
        get: (key: string) => {
          if (key === "showCompleted") return showCompleted ? "true" : "false";
          if (key === "showTodo") return showTodo ? "true" : "false";
          if (key === "order") return order;
          return null;
        }
    });
}

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

    describe("show completed turned off, show todo on", () => {
        beforeAll(() => {
            mockSearchParams = createMockSearchParams({
                showCompleted: false,
                showTodo: true,
                order: "chronologically",
            })
        });

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
    })

    describe("show completed turned on, show todo off", () => {
        beforeAll(() => {
            mockSearchParams = createMockSearchParams({
                showCompleted: true,
                showTodo: false,
                order: "chronologically",
            })
        });

        it("Should display only completed tasks when show todo is turned off", async () => {
            render(<ListOfTaskCards />)

            const notCompletedTask = screen.queryByText("title of 1");
            expect(notCompletedTask).not.toBeInTheDocument();

            await screen.findByText("title of 2");
        });
    });
});