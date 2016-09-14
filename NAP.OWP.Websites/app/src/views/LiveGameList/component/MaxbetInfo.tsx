import React, { Fragment } from 'react';
import { AssignmentInfo, MatchSettingInfo } from '../type/TableType';
import AssignmentComponent from './Assignment';
import OtherAssignment from './OtherAssignment';
type Props = {
  name: string | null;
  maxbet: MatchSettingInfo | null;
  traders: AssignmentInfo[];
  others: AssignmentInfo[];
};

function MaxbetInfo({ name, maxbet, traders, others }: Props) {
  return (
    <>
      {name && <td className={`name-max-bet bg-${name}`}>{name}</td>}
      <td className='spread'>{maxbet?.MaxbetSpreadToDisplay}</td>
      <td className='assignee-group'>
        <AssignmentComponent assignment={traders} />
        <OtherAssignment assignment={others} />
      </td>
    </>
  );
}

export default MaxbetInfo;
