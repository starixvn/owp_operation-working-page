import React from 'react';
import { TUserInfo } from '../../../type';
import store from '../../../app/useStoreNative';
import { MultiSelect } from 'react-multi-select-component';

const LanguageCell = (props: {
  dataSource: Array<TUserInfo>,
  rowIndex: number
}) => {
  const { languages } = store.getState().options;
  const { rowIndex, dataSource } = props;
  const league = dataSource[rowIndex].languages?.split(',');
  const value = languages.filter(o => league?.some(id => id === o.label));

  return (
    <MultiSelect
      value={value}
      options={languages}
      ClearSelectedIcon={null}
      disableSearch
      hasSelectAll={false}
      labelledBy=''
    />
  );
};

export default LanguageCell;
