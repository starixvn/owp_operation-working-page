import React from 'react';
import { CellProps } from '../../../type';
import store from '../../../app/useStoreNative';
import SingleSelection from '../cellCommon/SingleSelection';
import { updateUserInfo } from '../../../utils';

const DepartmentCell = ({ dataSource, rowIndex }: CellProps) => {
  const { options, updateValue } = store.getState();
  const { departments } = options;
  const { userId } = dataSource[rowIndex];

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    updateUserInfo({
      ColumnName: 'DepartmentId',
      UserId: `${userId}`,
      Value: value === '0' ? '' : value
    });

    updateValue(value, 'departmentId', rowIndex);
  };

  return (
    <SingleSelection
      defaultValue={dataSource[rowIndex].departmentId ?? undefined}
      onChange={handleChange}
      options={departments}
    />
  );
};

export default DepartmentCell;
