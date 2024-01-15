import React from 'react';
import { MultiSelect } from 'react-multi-select-component';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import Utils from '../../Shared/Utils';
import { updateFilterState } from './filterSlice';
import { TOptions } from '../type/type';

const MatchStatusFilter = () => {
  const dispatch = useDispatch();
  const { filterOptions, filterState } = useSelector(
    (state: RootState) => state.filter
  );
  const { MatchStatus } = filterOptions;
  const { selectedMatchStatus } = filterState;
  const matchStatusOptions: TOptions[] =
    Utils.buildMatchStatusOption(MatchStatus);
  const handleOnChange = (value: TOptions[]) => {
    const model = {
      key: 'selectedMatchStatus',
      value: value
    };
    dispatch(updateFilterState(model));
  };
  return (
    <div className='filter-control multiselect'>
      <div className='label'>Match Status</div>
      <MultiSelect
        options={matchStatusOptions}
        disableSearch
        ClearSelectedIcon={null}
        value={selectedMatchStatus}
        onChange={handleOnChange}
        labelledBy={''}
      />
    </div>
  );
};
export default MatchStatusFilter;
