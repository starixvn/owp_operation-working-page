import React from 'react';

type Props = {
  rowIndex: number;
};

const NoCell = ({ rowIndex }: Props) =>
  <span className='no-cell'>{rowIndex + 1} </span>;

export default NoCell;
