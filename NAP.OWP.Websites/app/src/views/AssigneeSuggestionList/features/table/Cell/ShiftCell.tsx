import React from 'react';
import { TableCell } from '../../TypeNative';
type Props = TableCell & {
  shiftCode?: string;
};

const ShiftCell = ({ value, shiftCode }: Props) => {
  return (
    <div className='shift-cell '>
      <span>{value}</span>
      <span className='shift-code'> &nbsp;{shiftCode}</span>
    </div>
  );
};

export default ShiftCell;
