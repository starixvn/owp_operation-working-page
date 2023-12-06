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
    updateUserInfo({
      ColumnName: 'SectionId',
      UserId: `${userId}`,
      Value: event.target.value
    });
    updateValue(event.target.value, 'sectionId', rowIndex);
  };

  return (
    <SingleSelection
      defaultValue={dataSource[rowIndex].sectionId ?? undefined}
      onChange={handleChange}
      options={sections}
    />
  );
};

export default SectionCell;
