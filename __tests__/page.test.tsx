import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Page from '@/app/page';
import { usePathname, useSearchParams } from 'next/navigation';

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
      useSearchParams: () => ({
        get: () => {}
      })
}});

describe('Page', () => {
    it('renders a heading', () => {
        render(<Page />)

        const heading = screen.getByRole('heading', { level: 1 })

        expect(heading).toBeInTheDocument();
    })
})