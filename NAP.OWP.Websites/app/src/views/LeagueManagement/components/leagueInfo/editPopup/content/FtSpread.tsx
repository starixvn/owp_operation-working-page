import React from 'react';
import { TProps } from '../EditType';
import { InputItem } from '../component/InputItem';

const FtSpread: React.FC<TProps> = ({ data }) => {
  const { spreadShow } = data;

  return (
    <div className='list'>
      <div className='title'>FT Spread</div>
      <div className='content-column-2'>
        <InputItem
          label='HDP-OU(%)'
          inputKey={'spread'}
          value={spreadShow}
        />
      </div>
    </div >
  );
};

export default FtSpread;