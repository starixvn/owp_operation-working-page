import React, { useState } from 'react';
import { useSelector, useDispatch, Provider } from 'react-redux';
import TicketDetail from './TicketDetail';
import configureStore from 'redux-mock-store';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const middlewares = [];
const mockStore = configureStore(middlewares);

const initialState = {};
const store = mockStore(initialState);
const mockSetState = jest.fn();

const Wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn()
}));
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn()
}));
const mockedDispatch = jest.fn();
useState.mockImplementation(init => [init, mockSetState]);
useDispatch.mockReturnValue(mockedDispatch);
useSelector.mockImplementation(f =>
  f({
    chatBoard: {
      ticketDetail: {
        ticketId: 0,
        ticketTypeId: '',
        ticketTypeName: '',
        messages: [],
        owpLeagueId: '',
        owpLeagueName: '',
        owpHomeId: '',
        owpAwayId: '',
        homeName: '',
        awayName: '',
        subject: '',
        creatorInfo: {
          id: 0,
          userName: '',
          nickName: ''
        }
      }
    },
    policy: {
      permission: { Username: 'sa', UserId: 8, HasWrite: true }
    }
  })
);

describe('test with TicketDetail component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correct', async () => {
    const { container } = render(<TicketDetail />);
    const showInfo = container.querySelector('.show-info');
    fireEvent.click(showInfo);
    expect(mockSetState).toBeCalled();
  });

  it('should call dispatch fn when click close icon', () => {
    const { getByTestId } = render(<TicketDetail />);
    const element = getByTestId('close-testId');

    fireEvent.click(element);

    expect(mockedDispatch).toHaveBeenCalledTimes(1);
  });
});
