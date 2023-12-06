import React from 'react';
import { TUserInfo } from '../../../type';
import store from '../../../app/useStoreNative';
import SingleSelection from '../cellCommon/SingleSelection';
import { updateUserInfo } from '../../../utils';

const LocationCell = (props: {
  dataSource: Array<TUserInfo>,
  rowIndex: number
}) => {
  const { options, updateValue } = store.getState();
  const { locationCodes } = options;
  const { rowIndex, dataSource } = props;
  const { locationCode, userId } = dataSource[rowIndex];

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    updateUserInfo({
      ColumnName: "LocationCode",
      UserId: `${userId}`,
      Value: value
    });
    updateValue(value, 'locationCode', rowIndex);
  };

  return <SingleSelection
    defaultValue={locationCode ?? undefined}
    onChange={handleChange}
    options={locationCodes}
  />;
};

export default LocationCell;