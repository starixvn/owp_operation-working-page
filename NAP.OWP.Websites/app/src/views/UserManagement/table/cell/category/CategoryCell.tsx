import React from 'react';
import { TUserInfo } from '../../../type';
import store from '../../../app/useStoreNative';
import SingleSelection from '../cellCommon/SingleSelection';

const CategoryCell = (props: {
  dataSource: Array<TUserInfo>;
  rowIndex: number;
}) => {
  const { options, updateValue } = store.getState();
  const { categories } = options;
  const { rowIndex, dataSource } = props;
  const { categoryName } = dataSource[rowIndex];

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    /* const x = event.target.value
    updateValue()
    debugger */
  };

  return (
    <SingleSelection
      defaultValue={categoryName ?? undefined}
      onChange={handleChange}
      options={categories}
    />
  );
};

export default CategoryCell;
