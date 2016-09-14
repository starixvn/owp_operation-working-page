import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import Dialog from './Dialog';

import { useDispatch, useSelector } from 'react-redux';
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn()
}));
const mockDispatch = jest.fn();
(useSelector as jest.Mock).mockImplementation(selectorFn =>
  selectorFn({
    policy: {
      permission: { Username: 'sa', UserId: 8, HasWrite: true, SiteId: 99 }
    }
  })
);
(useDispatch as jest.Mock).mockReturnValue(mockDispatch);
describe('Command under test', () => {
  it('should render Command', () => {
    const handleOnClose = jest.fn();
    const handleOnSave = jest.fn();
    const props = { onClose: handleOnClose, onSave: handleOnSave };
    const { container } = render(
      <Dialog
        ticketType={{
          typeId: 0,
          typeName: ''
        }}
        recipients={[]}
        subtypes={[]}
        {...props}
      />
    );

    fireEvent.click(screen.getByText('Cancel'));
    fireEvent.click(screen.getByText('Save'));
    expect(handleOnClose).toBeCalled();
    expect(handleOnSave).toBeCalled();
  });
});
