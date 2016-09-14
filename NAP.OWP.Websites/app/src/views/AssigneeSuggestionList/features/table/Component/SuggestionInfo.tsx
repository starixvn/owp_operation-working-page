import React from 'react';
import { UserWorkingSchedule } from '../../TypeNative';
import TraderInfo from './TraderInfo';
import WorkingShift from './WorkingShift';

type Props = {
  workingShifts: UserWorkingSchedule[] | null;
  title: string;
};

const SuggestionInfo = ({ workingShifts, title }: Props) => {
  return (
    <>
      {workingShifts?.map((item, index) => (
        <tr key={index}>
          <TraderInfo userInfo={item.userInfo} index={index}></TraderInfo>
          <WorkingShift data={item} index={index}></WorkingShift>
        </tr>
      ))}
    </>
  );
};

export default SuggestionInfo;
