import React, { useState, createRef } from 'react';
import { useSelector, useDispatch, Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from 'reactstrap';
import { AttachFileIcon, SendIcon } from 'mdi-react';
import InputMessage from './InputMessage';
import axios from 'axios';
import ToastrWrapper from '../../../components/ToastrWrapper';
import { noop } from 'lodash';
import { setImmediate } from 'timers';

function flushPromises() {
  return new Promise(resolve => setImmediate(resolve));
}

const middlewares = [];
const mockStore = configureStore(middlewares);

const initialState = {};
const store = mockStore(initialState);

const Wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
const setState = jest.fn();

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn()
}));
jest.mock('axios');
jest.mock('../../../components/ToastrWrapper');
ToastrWrapper.showError.mockImplementation(() => noop());

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
  createRef: jest.fn()
}));
const mockClickRef = jest.fn();
const ref = { current: { click: mockClickRef } };

const mockedDispatch = jest.fn();
const mockHandleSendFile = jest.fn();
const mockHandleSendMessage = jest.fn();

useState.mockImplementation(init => [init, setState]);
useDispatch.mockReturnValue(mockedDispatch);
useSelector.mockImplementation(f =>
  f({
    chatBoard: {
      ticketDetail: {
        ticketId: '12',
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
createRef.mockResolvedValue(ref);

describe('test InputMessage', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render component correct', () => {
    const { container } = render(
      <InputMessage
        handleSendFile={mockHandleSendFile}
        handleSendMessage={mockHandleSendMessage}
      />
    );
    const element = container.querySelector('input');
    expect(element).toBeInTheDocument();
  });

  it('test click SendIcon', () => {
    const { container } = render(
      <InputMessage
        handleSendFile={mockHandleSendFile}
        handleSendMessage={mockHandleSendMessage}
      />
    );
    const firstIcon = container.querySelectorAll('.mdi-icon')[0];
    fireEvent.click(firstIcon);
  });
  it('should trigger when press enter input', () => {
    render(
      <InputMessage
        handleSendFile={mockHandleSendFile}
        handleSendMessage={mockHandleSendMessage}
      />
    );
    const input = screen.getByPlaceholderText('Type a message...');
    fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 });
    expect(mockHandleSendMessage).toBeCalled();
  });

  it('onchange input file, invalid file.name, should not call dispatch', () => {
    const { container } = render(
      <InputMessage
        handleSendFile={mockHandleSendFile}
        handleSendMessage={mockHandleSendMessage}
      />
    );
    const file = new File([new ArrayBuffer(6000000)], 'file.abc');
    axios.post.mockResolvedValue({ data: 1 });
    const input = container.querySelectorAll('input')[0];
    fireEvent.change(input, { target: { files: [file] } });
    expect(mockHandleSendFile).toBeCalled();
  });
});
