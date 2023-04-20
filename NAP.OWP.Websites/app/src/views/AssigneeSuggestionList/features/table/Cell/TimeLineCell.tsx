import React from 'react';
import { AssignmentCell } from '../../TypeNative';

type Props = AssignmentCell;

const TimeLineCell = ({ text, color, textColor }: Props) => {
  return (
    <div className='item' style={{ backgroundColor: color }}>
      <span style={{ color: textColor }}>{text}</span>
    </div>
  );
};

export default TimeLineCell;
