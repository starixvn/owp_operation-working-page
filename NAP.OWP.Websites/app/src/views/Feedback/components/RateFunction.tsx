import React from 'react';
import { BODY } from '../const.json';
import AngryIcon from '../../../assets/svg-element/AngryIcon';
import SadIcon from '../../../assets/svg-element/SadIcon';
import NormalIcon from '../../../assets/svg-element/NormalIcon';
import GoodIcon from '../../../assets/svg-element/GoodIcon';
import AmazingIcon from '../../../assets/svg-element/AmazingIcon';
import useStore from '../app/store';
import { RateIconEnum } from '../type';
import AngryActiveIcon from '../../../assets/svg-element/AngryActiveIcon';
import SadActiveIcon from '../../../assets/svg-element/SadActiveIcon';
import NormalActiveIcon from '../../../assets/svg-element/NormalActiveIcon';
import GoodActiveIcon from '../../../assets/svg-element/GoodActiveIcon';
import AmazingActiveIcon from '../../../assets/svg-element/AmazingActiveIcon';

const RateFunction = () => {


  const setRateStatus = useStore(state => state.setRateStatus);
  const rate = useStore(state => state.feedBackInfo.rate);
  return (
    <div className='rate__function'>
      <p className='title'>{BODY.RATE_FUNCTION}</p>
      <div className='rate__icon'>
        {rate !== RateIconEnum.ANGRY ?
          <a onClick={() => setRateStatus(RateIconEnum.ANGRY)}>
            <AngryIcon />
          </a>
          : <a onClick={() => setRateStatus(RateIconEnum.DEFAULT)}>
            <AngryActiveIcon />
          </a>}
        {rate !== RateIconEnum.SAD ?
          <a onClick={() => setRateStatus(RateIconEnum.SAD)}>
            <SadIcon />
          </a>
          : <a onClick={() => setRateStatus(RateIconEnum.DEFAULT)}>
            <SadActiveIcon />
          </a>}
        {rate !== RateIconEnum.NORMAL ?
          <a onClick={() => setRateStatus(RateIconEnum.NORMAL)}>
            <NormalIcon />
          </a>
          : <a onClick={() => setRateStatus(RateIconEnum.DEFAULT)}>
            <NormalActiveIcon />
          </a>}
        {rate !== RateIconEnum.GOOD ?
          <a onClick={() => setRateStatus(RateIconEnum.GOOD)}>
            <GoodIcon />
          </a>
          : <a onClick={() => setRateStatus(RateIconEnum.DEFAULT)}>
            <GoodActiveIcon />
          </a>}
        {rate !== RateIconEnum.AMAZING ?
          <a onClick={() => setRateStatus(RateIconEnum.AMAZING)}>
            <AmazingIcon />
          </a>
          : <a onClick={() => setRateStatus(RateIconEnum.DEFAULT)}>
            <AmazingActiveIcon />
          </a>}
      </div>
    </div>
  );
};

export default RateFunction;
