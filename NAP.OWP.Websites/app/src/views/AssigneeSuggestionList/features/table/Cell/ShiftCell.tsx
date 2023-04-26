import React from 'react';
import { TableCell } from '../../TypeNative';
type Props = TableCell & {
  shiftCode?: string;
};

const ShiftCell = ({ value, shiftCode }: Props) => {
  return (
    <div className='shift-cell'>
      <span>
        {value} {shiftCode && <span>({shiftCode})</span>}
      </span>
    </div>
  );
};

export default ShiftCell;
