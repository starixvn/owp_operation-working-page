import React from 'react';
import { render } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import '@testing-library/jest-dom';
import LastUpdated from './LastUpdated';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn()
}));

const mockedDispatch = jest.fn();
const setUp = () => {
  (useDispatch as jest.Mock).mockReturnValue(mockedDispatch);
};

describe('test for LastUpdated component', () => {
  beforeEach(() => {
    setUp();
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('render correct loading', () => {
    (useSelector as jest.Mock).mockImplementation(selectorFn =>
      selectorFn({
        lastUpdate: {
          loading: 'pending',
          entity: {
            date: '',
            username: ''
          }
        }
      })
    );
    const { container } = render(<LastUpdated />);

    expect(container.querySelector('.loading-process')).toBeInTheDocument();
  });

  it('render correct with date and username', () => {
    (useSelector as jest.Mock).mockImplementation(selectorFn =>
      selectorFn({
        lastUpdate: {
          loading: 'succeeded',
          entity: {
            date: '2021-01-01T01:00:00',
            username: 'sa'
          }
        }
      })
    );
    const { container } = render(<LastUpdated />);

    expect(container.querySelector('.last-update')).toBeInTheDocument();
    expect(container.querySelector('.last-update')?.textContent).toEqual(
      'Last Updated at January 1, 2021 1:00 AM (GMT+8) by sa'
    );
  });
});
