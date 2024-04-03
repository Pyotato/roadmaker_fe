// eslint-disable-next-line simple-import-sort/imports
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { fireEvent } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import { useRouter } from 'next/router';

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

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

const ExampleComponent = ({ href = '' }) => {
  const router = useRouter();
  return (
    <button onClick={() => router.push(href)}>
      The current route is: "{router.asPath}"
    </button>
  );
};

describe('next-router-mock', () => {
  it('mocks the useRouter hook', () => {
    // Set the initial url:
    mockRouter.push('/initial-path');

    render(<ExampleComponent href='/foo?bar=baz' />);
    expect(screen.getByRole('button')).toBeInTheDocument();

    // Click the button:
    fireEvent.click(screen.getByRole('button'));

    // Ensure the router was updated:
    expect(mockRouter).toMatchObject({
      asPath: '/foo?bar=baz',
      pathname: '/foo',
      query: { bar: 'baz' },
    });
  });
});
