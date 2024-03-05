// eslint-disable-next-line simple-import-sort/imports
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import NotFound from '@/app/not-found';
import { MantineProvider } from '@mantine/core';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

export function mockFetch(data: unknown) {
  return jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () => data,
    }),
  );
}

describe('Error', () => {
  it('renders the Components', () => {
    window.fetch = mockFetch({});
    render(
      <MantineProvider>
        <NotFound />
      </MantineProvider>,
    );

    const text = screen.getByText(/home/i);

    expect(text).toBeInTheDocument();
  });
});
