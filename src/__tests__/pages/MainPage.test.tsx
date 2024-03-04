// eslint-disable-next-line simple-import-sort/imports
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import MainPage from '@/components/MainPage';

export function mockFetch(data: unknown) {
  return jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () => data,
    }),
  );
}

describe('MainPage', () => {
  it('renders the Components', () => {
    window.fetch = mockFetch({});
    render(<MainPage />);

    const text = screen.getByText(/hi!/i);

    expect(text).toBeInTheDocument();
  });
});
