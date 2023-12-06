import React from 'react';
import { CellProps } from '../../../type';
import store from '../../../app/useStoreNative';
import SingleSelection from '../cellCommon/SingleSelection';

const SectionCell = ({ dataSource, rowIndex }: CellProps) => {
  const { options, updateValue } = store.getState();
  const { sections } = options;

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
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
