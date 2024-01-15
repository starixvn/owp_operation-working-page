import React, { useState } from 'react';
import { MultiSelect } from 'react-multi-select-component';
import { MATCH_TYPE_OPTION } from './FilterConst.json';
const MatchTypeFilter = () => {
  const [selectedMatchType, setSelectedMatchType] = useState(MATCH_TYPE_OPTION);
  const handleOnChange = (value: any) => {
    console.log(value);
  };
  return (
    <div className='filter-control multiselect'>
      <div className='label'>Match Type</div>
      <MultiSelect
        options={MATCH_TYPE_OPTION}
        disableSearch
        ClearSelectedIcon={null}
        value={selectedMatchType}
        onChange={handleOnChange}
        labelledBy={''}
      />
    </div>
  );
};
export default MatchTypeFilter;
