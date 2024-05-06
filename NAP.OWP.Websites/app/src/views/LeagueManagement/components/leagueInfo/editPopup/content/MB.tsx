import React from 'react';
import { InputItem } from '../component/InputItem';
import { TProps } from '../EditType';

const MB: React.FC<TProps> = ({ data, updateSetting }) => {
  return (
    <div className='list'>
      <div className='title'>MB</div>
      <div className='content-column-2'>
        <InputItem
          label='Weekday HDP (K)'
          inputKey={'maxbetWD_HDP'}
          value={data.maxbetWD_HDP_Show}
          updateObject={updateSetting('maxbetWD_HDP')} />
        <InputItem
          label='Weekday NO. HDP (K)'
          inputKey={'maxbetWD_NoOfHDP'}
          value={data.maxbetWD_NoOfHDP_Show}
          updateObject={updateSetting} />
      </div>
      <div className='content-column-2'>
        <InputItem
          label='Weekend HDP (K)'
          inputKey={'maxbetWK_HDP'}
          value={data.maxbetWK_HDP_Show}
          updateObject={updateSetting} />
        <InputItem
          label='Weekend NO. HDP (K)'
          inputKey={'maxbetWK_NoOfHDP'}
          value={data.maxbetWK_NoOfHDP_Show}
          updateObject={updateSetting} />
      </div>
    </div>
  );
};

export default MB;