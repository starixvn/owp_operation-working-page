import React from 'react';
import { TUserInfo } from '../../../type';
import store from '../../../app/useStoreNative';

const LocationCell = (props: {
  dataSource: Array<TUserInfo>,
  rowIndex: number
}) => {
  const { locationCodes } = store.getState().options;
  const { rowIndex, dataSource } = props;
  const { locationCode } = dataSource[rowIndex];
  const currentLocation = locationCodes.find(l => locationCode === l.label);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const x = event.target.value
    debugger
  }

  return (
    <div className='select-wrapper-default'>
      <select
        disabled={false}
        className='browser-default'
        defaultValue={currentLocation?.label}
        onChange={handleChange}>
        {locationCodes.map(opt =>
          <option key={opt.value} value={opt.label}>
            {opt.label}
          </option>
        )}
      </select>
    </div>
  );
};

export default LocationCell;