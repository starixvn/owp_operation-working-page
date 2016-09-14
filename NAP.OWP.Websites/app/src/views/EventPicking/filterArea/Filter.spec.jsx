import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useDispatch } from 'react-redux';

import ToastrWrapper from '../../components/ToastrWrapper';
import Filter from './Filter';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn()
}));
jest.mock('../../components/ToastrWrapper');

ToastrWrapper.showError = jest.fn().mockReturnValue('OK');

const mockedDispatch = jest.fn();
useDispatch.mockReturnValue(mockedDispatch);

describe('test FilterTicketCenter', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('show list Filter ', async () => {
    render(<Filter />);

    expect(screen.queryByText(/Date/i)).toBeInTheDocument();
    expect(screen.queryByText(/Select Game/i)).toBeInTheDocument();
    expect(screen.queryByText(/Filter Match/i)).toBeInTheDocument();
  });

  it('click Search, should dispatch', async () => {
    render(<Filter />);
    await fireEvent.click(screen.queryByText(/Search/i));
    expect(mockedDispatch).toHaveBeenCalledTimes(1);
  });
});
