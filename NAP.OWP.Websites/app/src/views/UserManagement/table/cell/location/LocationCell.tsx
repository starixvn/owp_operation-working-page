import React from 'react';
import { TUserInfo } from '../../../type';
import store from '../../../app/useStoreNative';
import SingleSelection from '../cellCommon/SingleSelection';

const LocationCell = (props: {
  dataSource: Array<TUserInfo>,
  rowIndex: number
}) => {
  const { options, updateValue } = store.getState();
  const { locationCodes } = options;
  const { rowIndex, dataSource } = props;
  const { locationCode } = dataSource[rowIndex];
  const currentLocation = locationCodes.find(l => locationCode === l.label);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    /* const x = event.target.value
    updateValue()
    debugger */
  }

  return <SingleSelection
    defaultValue={currentLocation?.value ?? undefined}
    onChange={handleChange}
    options={locationCodes}
  />;
};

export default LocationCell;