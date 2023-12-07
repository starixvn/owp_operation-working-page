import React from 'react';
import { TUserInfo } from '../../../type';
import store from '../../../app/useStoreNative';
import SingleSelection from '../cellCommon/SingleSelection';
import { updateUserInfo } from '../../../utils';

const RoleCell = (props: {
  dataSource: Array<TUserInfo>;
  rowIndex: number;
}) => {
  const { options, updateValue } = store.getState();
  const { roles } = options;
  const { rowIndex, dataSource } = props;
  const { roleId, userId } = dataSource[rowIndex];

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    updateUserInfo({
      ColumnName: 'RoleId',
      UserId: `${userId}`,
      Value: event.target.value
    });

    updateValue(event.target.value, 'roleId', rowIndex);
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
