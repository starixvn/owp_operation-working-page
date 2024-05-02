import React from 'react';
import RoundList from '../../../condition/round/RoundList';

const Condition = () => {
  return (
    <div className='list'>
      <div className='title'>Condition</div>
      <RoundList rounds={model.round} />
    </div>
  );
};

export default Condition;