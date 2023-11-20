import React from 'react';
import { timeLineColumn } from '../../../const/Const.json';
import {
  AssignmentCell,
  TimeLine,
  UserWorkingSchedule
} from '../../TypeNative';
import TimeLineCell from '../Cell/TimeLineCell';
import { uniqueId } from 'lodash';

type Props = {
  index: number;
  data: UserWorkingSchedule;
};

const WorkingShift = ({ index, data }: Props) => {
  const assignmentTimeLine = (assignments: AssignmentCell[]) => (
    <>
      {assignments.map(assignment => (
        <TimeLineCell
          color={assignment?.color}
          text={assignment?.text}
          textColor={assignment?.textColor}
          key={uniqueId()}></TimeLineCell>
      ))}
    </>
  );

  return (
    <>
      {timeLineColumn.map((x: TimeLine) => {
        const assignments = data[
          x.id as keyof UserWorkingSchedule
        ] as AssignmentCell[];
        const className = assignments?.length > 1 ? 'overlap-timeline ' : '';
        return (
          <td key={`${index}-${x.id}`} className={className}>
            {assignments && assignmentTimeLine(assignments)}
          </td>
        );
      })}
    </>
  );
};

export default WorkingShift;
