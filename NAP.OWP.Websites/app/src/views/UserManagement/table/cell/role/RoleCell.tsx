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
  const { roleId } = dataSource[rowIndex];

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    updateValue(parseInt(event.target.value), 'roleId', rowIndex);
  };

  return (
    <SingleSelection
      defaultValue={roleId ?? undefined}
      onChange={handleChange}
      options={roles}
    />
  );
};

export default RoleCell;
