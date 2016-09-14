import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { render } from '@testing-library/react';
import AssignmentCellFactory from './AssignmentCellFactory';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn()
}));

const mockDispatch = jest.fn();
useDispatch.mockReturnValue(mockDispatch);
useSelector.mockImplementation(selectorFn =>
  selectorFn({
    copy: {
      isCopying: false,
      copiedValue: {
        HDP: '',
        OU: ''
      },
      highlightedCell: {
        PreMatchLeagueId: 1,
        rowId: 1,
        isTakeOver: false
      }
    }
  })
);

const createProps = isEdit => {
  const dataSource = [
    {
      PreMatchLeagueId: 123,
      InfoSiteMatchId: undefined
    }
  ];
  const rowIndex = 0;
  const isEditing = isEdit;
  return { isEditing, dataSource, rowIndex, columnId: '' };
};

describe('AssignmentCellFactory under test', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('when isEditing = true, should render EditableAssignmentCell', () => {
    const props = createProps(true);
    const { container } = render(<AssignmentCellFactory {...props} />);
    const element = container.querySelector('.edit-assignment');
    expect(element).toBeInTheDocument();
  });

  it('when isEditing = false, should render ReadOnlyAssignmentCell', () => {
    const props = createProps(false);
    const { container } = render(<AssignmentCellFactory {...props} />);
    const element = container.querySelector('.assignment-readonly');
    expect(element).toBeInTheDocument();
  });
});
