import React from 'react';
import { InputItem } from '../component/InputItem';
import { TProps } from '../EditType';

const FtSpread: React.FC<TProps> = ({ data, updateSetting }) => {
  return (
    <div className='list'>
      <div className='title'>FT Spread</div>
      <div className='content-column-2'>
        <InputItem
          label='HDP(%)'
          inputKey={'spread_HDP'}
          value={data.spread_HDP_value?.toString()}
          updateObject={updateSetting}
        />
        <InputItem
          label='OU(%)'
          inputKey={'spread_OU'}
          value={data.spread_OU_value?.toString()}
          updateObject={updateSetting}
        />
      </div>
    </div >
  );
};

export default FtSpread;