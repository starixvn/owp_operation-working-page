import React, { useRef } from 'react';
import { TableCell } from '../../TypeNative';

type Props = TableCell & {
  isManagement?: boolean;
};

const TraderCell = ({ value, isManagement }: Props) => {
  return (
    <>
      <div className={isManagement ? 'trader-management' : 'trader'}>
        <span>{isManagement ? <b>{value}</b> : value}</span>
      </div>
    </>
  );
};

export default TraderCell;
