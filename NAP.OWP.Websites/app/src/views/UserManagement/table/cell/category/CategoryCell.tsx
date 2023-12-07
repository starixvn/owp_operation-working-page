import React from 'react';
import { TUserInfo } from '../../../type';
import store from '../../../app/useStoreNative';
import SingleSelection from '../cellCommon/SingleSelection';
import { updateUserInfo } from '../../../utils';

const CategoryCell = (props: {
  dataSource: Array<TUserInfo>;
  rowIndex: number;
}) => {
  const { options, updateValue } = store.getState();
  const { categories } = options;
  const { rowIndex, dataSource } = props;
  const { categoryId, userId } = dataSource[rowIndex];

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    updateUserInfo({
      ColumnName: 'CategoryId',
      UserId: `${userId}`,
      Value: value === '0' ? '' : value
    });

    updateValue(value, 'categoryId', rowIndex);
  };

  return (
    <SingleSelection
      defaultValue={categoryId ?? undefined}
      onChange={handleChange}
      options={categories}
    />
  );
};

export default CategoryCell;
