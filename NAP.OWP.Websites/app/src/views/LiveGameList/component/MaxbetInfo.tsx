import React from 'react';
import { AssignmentInfo, MatchSettingInfo } from '../type/TableType';
import AssignmentComponent from './Assignment';
import OtherAssignment from './OtherAssignment';
type Props = {
  name: string | null;
  maxbet: MatchSettingInfo | null;
  traders: AssignmentInfo[];
  others: AssignmentInfo[];
  rowSpan?: number;
};

function MaxbetInfo({ name, maxbet, traders, others, rowSpan }: Props) {
  return (
    <>
      {name && (
        <td rowSpan={rowSpan} className={`name-max-bet bg-${name}`}>
          {name}
        </td>
      )}
      <td rowSpan={rowSpan} className='spread'>
        {maxbet?.MaxbetSpreadToDisplay}
      </td>
      <td rowSpan={rowSpan} className='assignee-group'>
        <AssignmentComponent assignment={traders} />
        <OtherAssignment assignment={others} />
      </td>
    </>
  );
}

export default MaxbetInfo;
