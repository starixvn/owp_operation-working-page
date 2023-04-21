import React from 'react';
import { TAssigneeSuggestion } from '../TypeNative';
import SuggestionInfo from './Component/SuggestionInfo';

type Props = {
  workingShifts: TAssigneeSuggestion;
};

const TableBody = ({
  workingShifts: { busy, fullyAvailable, partiallyAvailable }
}: Props) => (
  <>
    <SuggestionInfo
      workingShifts={fullyAvailable}
      title='Assignee Suggestion(Available)'
      isOpen></SuggestionInfo>
    <SuggestionInfo
      workingShifts={partiallyAvailable}
      title='Assignee Suggestion(Partially available)'
      isOpen></SuggestionInfo>
    <SuggestionInfo workingShifts={busy} title='Busy'></SuggestionInfo>
  </>
);

export default TableBody;
