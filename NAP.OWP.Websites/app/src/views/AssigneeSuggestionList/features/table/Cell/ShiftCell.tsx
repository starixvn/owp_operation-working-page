import React from 'react';
import { TableCell } from '../../TypeNative';

const ShiftCell = ({ value }: TableCell) => {
  return (
    <div className='shift-cell '>
      <span>{value}</span>
    </div>
  );
};

export default ShiftCell;
