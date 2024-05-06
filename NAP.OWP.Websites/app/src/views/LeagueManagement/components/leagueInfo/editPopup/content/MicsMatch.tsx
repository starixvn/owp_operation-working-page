import React from 'react';
import { InputItem } from '../component/InputItem';
import { TProps } from '../EditType';

const MicsMatch: React.FC<TProps> = ({ data, updateSetting }) => {
  return (
    <div className='list'>
      <div className='title'>Display in Misc match file</div>
      <div className='content-column'>
        <InputItem
          label='LST Note (Show under League)'
          inputKey={'lstNote'}
          value={data.lstNote}
          updateObject={updateSetting}
        />
      </div>
      <div className='content-column'>
        <InputItem
          label='Remark 2 (Show under Match)'
          inputKey={'remark2'}
          value={data.remark2}
          updateObject={updateSetting}
        />
      </div>
    </div>
  );
};

export default MicsMatch;