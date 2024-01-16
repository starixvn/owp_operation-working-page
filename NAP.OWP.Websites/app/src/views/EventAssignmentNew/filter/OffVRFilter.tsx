import React from 'react';
import { MultiSelect } from 'react-multi-select-component';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { TOptions } from '../type/type';
import Utils from '../../Shared/Utils';

const OffVRFilter = () => {
  const dispatch = useDispatch();
  const { filterOptions, filterState } = useSelector(
    (state: RootState) => state.filter
  );
  const { OffVR } = filterOptions;
  const { selectedOffVRs } = filterState;
  const offVROptions: TOptions[] = Utils.buildOffVROption(OffVR);
  return (
    <div className='filter-control multiselect off-vr'>
      <div className='label'>OFF VR</div>
      <MultiSelect
        options={offVROptions}
        disableSearch
        ClearSelectedIcon={null}
        value={selectedOffVRs}
        onChange={() => console.log('an')}
        labelledBy={''}
      />
    </div>
  );
};
export default OffVRFilter;
