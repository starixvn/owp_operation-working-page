import React from 'react';
import { timeLineColumn } from '../../../const/Const.json';
import {
  AssignmentCell,
  TimeLine,
  UserWorkingSchedule
} from '../../TypeNative';
import TimeLineCell from '../Cell/TimeLineCell';

type Props = {
  index: number;
  data: UserWorkingSchedule;
};

const WorkingShift = ({ index, data }: Props) => {
  return (
    <>
      {timeLineColumn.map((x: TimeLine) => {
        const assignment = data[
          x.id as keyof UserWorkingSchedule
        ] as AssignmentCell;
        return (
          <td key={`${index}-${x.id} `}>
            <TimeLineCell
              color={assignment?.color}
              text={assignment?.text}
              textColor={assignment?.textColor}
              key={x.id}></TimeLineCell>
          </td>
        );
      })}
    </>
  );
};

export default WorkingShift;
