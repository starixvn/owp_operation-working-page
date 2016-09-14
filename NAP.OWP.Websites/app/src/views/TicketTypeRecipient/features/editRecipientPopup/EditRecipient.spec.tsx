import { render, screen, fireEvent } from '@testing-library/react';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Recipient } from '../TypeNative';
import EditRecipient from './EditRecipient';
import { TicketTypeRecipientEnum } from '../../../Shared/enum/TicketRecipientEnum';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn()
}));

const mockDispatch = jest.fn();
const mockSetRecipients = jest.fn() as Dispatch<SetStateAction<Recipient[]>>;

(useSelector as jest.Mock).mockImplementation(selectorFn =>
  selectorFn({
    policy: {
      permission: { Username: 'sa', UserId: 8, HasWrite: true, SiteId: 99 }
    }
  })
);
(useDispatch as jest.Mock).mockReturnValue(mockDispatch);

const props = {
  recipientsDefault: [
    {
      recipientId: 1,
      recipientName: 'sa',
      recipientNickname: '',
      recipientType: TicketTypeRecipientEnum.User,
      ticketTypeRecipientId: 1
    },
    {
      recipientId: 2,
      recipientName: 'sa2',
      recipientNickname: '',
      recipientType: TicketTypeRecipientEnum.User,
      ticketTypeRecipientId: 2
    },
    {
      recipientId: 1,
      recipientName: 'LST',
      recipientNickname: '',
      recipientType: TicketTypeRecipientEnum.Group,
      ticketTypeRecipientId: 3
    }
  ]
};
describe('EditRecipientPopup under test', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', () => {
    const { container } = render(<EditRecipient {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('should handleDeleteRecipient  ', () => {
    const { container } = render(<EditRecipient {...props} />);
    const element = container.querySelector(`[class="icon-edit"]`);
    expect(element).toBeInTheDocument();
  });
});
