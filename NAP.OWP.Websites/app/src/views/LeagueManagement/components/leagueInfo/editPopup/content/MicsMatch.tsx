import React from 'react';
import { TProps } from '../EditType';
import { InputItem } from '../component/InputItem';

const MicsMatch: React.FC<TProps> = ({ data }) => {
  const { lstNote, remark2 } = data;

  return (
    <div className='list'>
      <div className='title'>Display in Misc match file</div>
      <div className='content-column'>
        <InputItem
          label='LST Note (Show under League)'
          inputKey={'lstNote'}
          value={lstNote}
        />
      </div>
      <div className='content-column'>
        <InputItem
          label='Remark 2 (Show under Match)'
          inputKey={'remark2'}
          value={remark2}
        />
      </div>
    </div>
  );
};

export default MicsMatch;