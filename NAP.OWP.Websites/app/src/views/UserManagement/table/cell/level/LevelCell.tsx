import React from 'react';
import { TUserInfo } from '../../../type';
import store from '../../../app/useStoreNative';
import SingleSelection from '../cellCommon/SingleSelection';

const LevelCell = (props: {
  dataSource: Array<TUserInfo>,
  rowIndex: number
}) => {
  const state = store.getState();
  const user = props.dataSource[props.rowIndex];

  if (user.employeeId === 'L0378') {
    debugger
  }
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // TODO
  };

  return <SingleSelection
    defaultValue={user.level ?? undefined}
    onChange={handleChange}
    options={state.selectOption(user.sectionId)}
  />;
};

export default LevelCell;