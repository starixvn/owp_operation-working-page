import React from 'react';
import { AssignmentCell } from '../../TypeNative';

type Props = AssignmentCell & {
  key: string;
};

const TimeLineCell = ({ text, color, textColor, key }: Props) => {
  return (
    <div className='item' style={{ backgroundColor: color }}>
      <span style={{ color: textColor }}>{text}</span>
    </div>
  );
};

export default TimeLineCell;
