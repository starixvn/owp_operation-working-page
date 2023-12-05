import React from 'react';
import { TUserInfo } from '../../../type';
import store from '../../../app/useStoreNative';
import SingleSelection from '../cellCommon/SingleSelection';

const pickupOption = [{
  value: 'true',
  label: 'yes'
},
{
  value: 'false',
  label: 'no'
}, {
  value: 'none',
  label: 'none'
}];

const PickupCell = (props: {
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
    defaultValue={user.pickup ?? undefined}
    onChange={handleChange}
    options={pickupOption}
  />;
};

export default PickupCell;