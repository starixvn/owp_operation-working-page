import React from 'react';
import { PesOrFiFa } from '../../type/TTaskListTable';
import PesIcon from '../component/PesIcon';
import FifaIcon from '../component/FifaIcon';

const FlagFactory = (props: PesOrFiFa) => {
  const { IsPES, IsFIFA } = props;
  let flag = null;

  if (IsPES) {
    flag = <PesIcon {...props} />;
  }
  if (IsFIFA) {
    flag = <FifaIcon {...props} />;
  }
  return flag;
};

export default FlagFactory;
