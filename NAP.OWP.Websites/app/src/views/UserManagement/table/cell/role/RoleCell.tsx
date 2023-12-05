import React from 'react';
import { TUserInfo } from '../../../type';
import store from '../../../app/useStoreNative';
import SingleSelection from '../cellCommon/SingleSelection';

const RoleCell = (props: {
  dataSource: Array<TUserInfo>;
  rowIndex: number;
}) => {
  const { options, updateValue } = store.getState();
  const { roles } = options;
  const { rowIndex, dataSource } = props;
  const { roleName } = dataSource[rowIndex];
  // const currentLocation = r.find(l => locationCode === l.label);
  console.log(roleName);
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    /* const x = event.target.value
    updateValue()
    debugger */
  };

  return (
    <SingleSelection
      defaultValue={roleName ?? undefined}
      onChange={handleChange}
      options={roles}
    />
  );
};

export default RoleCell;
