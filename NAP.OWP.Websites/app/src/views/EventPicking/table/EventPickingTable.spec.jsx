import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import EventPickingTable from './EventPickingTable';
import { useSelector, useDispatch } from 'react-redux';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

const mockedDispatch = jest.fn();
const { ResizeObserver } = window;
describe('EventPickingTable under test', () => {
  beforeEach(() => {
    useSelector.mockImplementation(selectorFn =>
      selectorFn({
        eventPickingTable: {
          entities: [],
          filterState: [],
          isNoOfferAll: false,
        },
      })
    );
    useDispatch.mockReturnValue(mockedDispatch);

    //@ts-ignore
    delete window.ResizeObserver;
    window.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));
  });
  afterEach(() => {
    window.ResizeObserver = ResizeObserver;
    jest.restoreAllMocks();
  });
  it('render table correct', () => {
    const { getByText } = render(<EventPickingTable />);
    expect(getByText('No #')).toBeInTheDocument();
  });

  it('render window resize', async () => {
    let aResizeEventListenerWasAddedToWindow = false;

    const originalMethod = window.addEventListener;
    const spy = jest.spyOn(window, 'addEventListener');
    spy.mockImplementation((...args) => {
      originalMethod(...args);
      const [eventType] = args;
      if (eventType === 'resize') {
        aResizeEventListenerWasAddedToWindow = true;
      }
    });

    render(<EventPickingTable />);
    await waitFor(() =>
      expect(aResizeEventListenerWasAddedToWindow).toBeTruthy()
    );
  });
});
