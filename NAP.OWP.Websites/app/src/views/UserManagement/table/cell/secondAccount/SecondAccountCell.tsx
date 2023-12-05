import React from 'react';
import { TUserInfo } from '../../../type';
import store from '../../../app/useStoreNative';
import SingleSelection from '../cellCommon/SingleSelection';

const secondAccountOption = [{
  value: 'true',
  label: 'Yes'
},
{
  value: 'false',
  label: 'No'
}];

const SecondAccountCell = (props: {
  dataSource: Array<TUserInfo>,
  rowIndex: number
}) => {
  const { updateValue } = store.getState();
  const { rowIndex, dataSource } = props;
  const user = dataSource[rowIndex];

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // TODO
  }

  return <SingleSelection
    defaultValue={user.isSecondAccount ?? undefined}
    onChange={handleChange}
    options={secondAccountOption}
  />;
};

export default SecondAccountCell;