import React from 'react';
import { CellProps } from '../../../type';
import store from '../../../app/useStoreNative';
import SingleSelection from '../cellCommon/SingleSelection';
import { updateUserInfo } from '../../../utils';

const SectionCell = ({ dataSource, rowIndex }: CellProps) => {
  const { options, updateValue } = store.getState();
  const { sections } = options;
  const { userId } = dataSource[rowIndex];

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    updateUserInfo({
      ColumnName: 'SectionId',
      UserId: `${userId}`,
      Value: value === '0' ? '' : value
    });
    updateValue(value, 'sectionId', rowIndex);
    updateValue(0, 'level', rowIndex);
  };

  return (
    <SingleSelection
      defaultValue={dataSource[rowIndex].sectionId ?? 0}
      onChange={handleChange}
      options={sections}
    />
  );
};

export default SectionCell;
