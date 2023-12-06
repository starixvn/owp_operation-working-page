import React from 'react';

type Props = {
  rowIndex: number;
};

const NoCell = ({ rowIndex }: Props) => {
  return <span className='no-cell'>{rowIndex} </span>;
};

export default NoCell;
