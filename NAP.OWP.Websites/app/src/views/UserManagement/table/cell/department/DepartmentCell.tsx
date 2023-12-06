import React from 'react';
import { CellProps } from '../../../type';
import store from '../../../app/useStoreNative';
import SingleSelection from '../cellCommon/SingleSelection';

const DepartmentCell = ({ dataSource, rowIndex }: CellProps) => {
  const { options, updateValue } = store.getState();
  const { departments } = options;

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {};

  return (
    <SingleSelection
      defaultValue={dataSource[rowIndex].departmentId ?? undefined}
      onChange={handleChange}
      options={departments}
    />
  );
};

export default DepartmentCell;
