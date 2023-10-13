import React from 'react';
import useStore from '../../app/store';
import { MultiSelect } from 'react-multi-select-component';
const SectionOption = () => {
  const sectionOption = useStore(state => state.sectionOption);
  const sectionSelected = useStore(state => state.sectionSelected);
  const SetSectionSelected = useStore(state => state.setSectionSelected);

  return (
    <div>
      <div className='multi-select-dropdown'>
        <div className='label'>Section</div>
        <MultiSelect
          className='status'
          options={sectionOption}
          value={sectionSelected}
          disableSearch
          ClearSelectedIcon={null}
          onChange={SetSectionSelected}
        />
      </div>
    </div>
  );
};

export default SectionOption;
