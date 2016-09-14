import React from 'react';
import { UserWorkingSchedule } from '../TypeNative';
import SuggestionInfo from './Component/SuggestionInfo';

type Props = {
  workingShifts: UserWorkingSchedule[];
};

const TableBody = ({ workingShifts }: Props) => (
  <>
    <SuggestionInfo
      workingShifts={workingShifts}
      title='Assignee Suggestion(Available)'></SuggestionInfo>
  </>
);

export default TableBody;
