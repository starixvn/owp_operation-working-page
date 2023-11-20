import React from 'react';
import Select from 'react-select';
import { OVERT_TIME } from '../../const/OptionsConst';
import { shallow } from 'zustand/shallow';
import useStore from '../../app/useStoreNative';

const Filter = () => {
  const { filterOverTime } = useStore(
    state => ({
      filterOverTime: state.filterOverTime
    }),
    shallow
  );

  const handleChange = ({ value }) => {
    const v = value;
    debugger;
    filterOverTime(value);
  };

  return (
    <div className='overtime-dropdown'>
      <div className='overtime-filter-control'>
        <div className='label'>Overtime</div>
        <Select
          data-testId='select'
          options={OVERT_TIME.OPTIONS}
          defaultValue={OVERT_TIME.OPTIONS[0]}
          onChange={handleChange}
          className='basic-filter-select'
        />
      </div>
    </div>
  );
};

export default Filter;
