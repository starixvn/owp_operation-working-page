import React from 'react';
import { TProps } from '../EditType';
import { InputItem } from '../component/InputItem';

const MB: React.FC<TProps> = ({ data }) => {
  const {
    maxbetWD_HDP_Show,
    wD_NoOfHDP_Show,
    maxbetWK_HDP_Show,
    wK_NoOfHDP_Show
  } = data;

  return (
    <div className='list'>
      <div className='title'>MB</div>
      <div className='content-column-2'>
        <InputItem
          label='Weekday HDP (K)'
          inputKey={'maxbetWD_HDP'}
          value={maxbetWD_HDP_Show} />
        <InputItem
          label='Weekday NO. HDP (K)'
          inputKey={'wD_NoOfHDP'}
          value={wD_NoOfHDP_Show} />
      </div>
      <div className='content-column-2'>
        <InputItem
          label='Weekend HDP (K)'
          inputKey={'maxbetWK_HDP'}
          value={maxbetWK_HDP_Show} />
        <InputItem
          label='Weekend NO. HDP (K)'
          inputKey={'wK_NoOfHDP'}
          value={wK_NoOfHDP_Show} />
      </div>
    </div>
  );
};

export default MB;