import React from 'react';
import { clone } from 'lodash';
import OddTable from './OddTable';
import Service from './Service';
import { MajorBetTypes } from '../../Shared/Constants';
import { fireEvent, render, screen } from '@testing-library/react';

jest.mock('./Service');
const onEdit = jest.fn();
const onDelete = jest.fn();
const onSave = jest.fn();
const onCancel = jest.fn();

describe('OddTable', () => {
  const defaultProps = {
    matchId: 1,
    policy: {},
    home: 'Home',
    away: 'Away',
    editingIndex: 0,
    isEditing: true,
    isCreating: true,
    onEdit,
    onDelete,
    onSave,
    onCancel
  };

  const data = [
    {
      Id: 1,
      BetType: MajorBetTypes.Handicap,
      HDP: 1,
      TeamChoice: 1,
      HomeOdd: 1,
      AwayOdd: 2
    }
  ];

  describe('test Table', () => {
    const props = {
      ...defaultProps,
      rows: []
    };

    it('should render empty table if there is no data', () => {
      Service.query.mockResolvedValue([]);
      const { container } = render(<OddTable {...props} />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('test show/hide action', () => {
    it('should hide action when user has not permission write', () => {
      const props = {
        ...defaultProps,
        rows: [{ TeamChoice: 1 }],
        policy: {
          HasWrite: false
        }
      };
      const { container } = render(<OddTable {...props} />);
      expect(container.querySelector('.action-col')).toBeNull();
    });
  });

  describe('test actions', () => {
    const props = {
      ...defaultProps,
      isEditing: false,
      isCreating: false,
      rows: [{ TeamChoice: 1 }],
      policy: {
        HasWrite: true
      }
    };

    beforeEach(() => {
      Service.delete.mockResolvedValue();
      Service.update.mockResolvedValue();
      Service.query.mockResolvedValue(data);
    });

    it('should trigger onEdit when click Edit', () => {
      const { container } = render(<OddTable {...props} />);
      fireEvent.click(container.querySelector('.icon-edit'));
      expect(onEdit).toBeCalled();
    });

    it('should trigger onDelete when click Delete', () => {
      const { container } = render(<OddTable {...props} />);
      fireEvent.click(container.querySelector('.icon-delete'));
      expect(onDelete).toBeCalled();
    });

    it('should not invoke update when save unchanged row data', () => {
      Service.update.mockClear();
      Service.query.mockResolvedValue();

      const defaultProp = {
        ...props,
        isCreating: false,
        isEditing: true,
        editingIndex: 0,
        rows: data
      };

      const { container } = render(<OddTable {...defaultProp} />);

      fireEvent.click(container.querySelector('.icon-save'));
      expect(Service.update).not.toBeCalled();
    });

    it('should trigger onCancel when click Cancel in state to create a new row', () => {
      const defaultProp = {
        ...props,
        isCreating: false,
        isEditing: true,
        editingIndex: 0,
        rows: data
      };

      const { container } = render(<OddTable {...defaultProp} />);

      fireEvent.click(container.querySelector('.icon-cancel'));
      expect(onCancel).toBeCalled();
    });
  });
});
