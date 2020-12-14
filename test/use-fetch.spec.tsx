import * as React from 'react';
import { act, render, screen } from '@testing-library/react';

import useFetch from '../src/use-fetch';
import { PlainObject } from '../src/types';

import repositories from './__fixtures__/repositories.json';

const url = 'https://api.github.com/search/repositories?q=react&sort=stars';

const Component = ({ fetchOptions, wait }: any) => {
  const { data, error, status } = useFetch<PlainObject<any>[]>(fetchOptions, wait);

  return (
    <div data-testid="content">
      {status === 'failure' && <p data-testid="failure">{error?.toString()}</p>}
      {status === 'success' && (
        <ul data-testid="success">
          {data?.map(d => (
            <li key={d.id}>{d.full_name}</li>
          ))}
        </ul>
      )}
      {status === 'running' && <p data-testid="running">Loading</p>}
    </div>
  );
};

describe('useFetch', () => {
  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  afterAll(() => {
    // @ts-ignore
    console.error.mockRestore();
  });

  afterEach(() => {
    fetchMock.mockClear();
  });

  it('should handle success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(repositories));

    const { rerender } = render(<Component fetchOptions={url} />);

    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.github.com/search/repositories?q=react&sort=stars',
      {
        body: undefined,
        cache: 'no-store',
        credentials: undefined,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'GET',
        mode: 'cors',
      },
    );

    expect(screen.getByTestId('running')).toMatchSnapshot();

    await act(async () => {
      rerender(<Component fetchOptions={url} />);
    });

    expect(screen.getByTestId('success')).toMatchSnapshot();
  });

  it('should handle hard failure', async () => {
    fetchMock.mockRejectOnce(new Error('Failed to fetch'));

    await act(async () => {
      render(
        <Component
          fetchOptions={{
            url,
            type: 'urlencoded',
          }}
        />,
      );
    });

    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.github.com/search/repositories?q=react&sort=stars',
      {
        body: undefined,
        cache: 'no-store',
        credentials: undefined,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'GET',
        mode: 'cors',
      },
    );

    expect(screen.getByTestId('failure')).toMatchSnapshot();
  });

  it('should handle soft failure', async () => {
    fetchMock.mockResponse('Request failed', {
      status: 400,
      statusText: 'Request failed',
    });

    await act(async () => {
      render(
        <Component
          fetchOptions={{
            url,
            method: 'POST',
            body: { a: 1 },
            headers: {
              Authorization: 'Bearer 263619d6-1da5-41fc-ba66-081acacbf9af',
            },
          }}
        />,
      );
    });

    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.github.com/search/repositories?q=react&sort=stars',
      {
        body: '{"a":1}',
        cache: 'no-store',
        credentials: undefined,
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer 263619d6-1da5-41fc-ba66-081acacbf9af',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        mode: 'cors',
      },
    );

    expect(screen.getByTestId('failure')).toMatchSnapshot();
  });

  it('should handle "wait"', async () => {
    await act(async () => {
      render(<Component fetchOptions={url} wait />);
    });

    expect(fetchMock).toHaveBeenCalledTimes(0);

    expect(screen.getByTestId('content')).toMatchSnapshot();
  });

  it('should handle throw with invalid parameters', async () => {
    expect(() => render(<Component fetchOptions={[]} />)).toThrow(
      'Expected an options object or URL',
    );
  });
});
