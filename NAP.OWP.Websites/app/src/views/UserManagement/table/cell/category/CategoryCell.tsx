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
    updateUserInfo({
      ColumnName: 'CategoryId',
      UserId: `${userId}`,
      Value: event.target.value
    });

    updateValue(event.target.value, 'categoryId', rowIndex);
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
