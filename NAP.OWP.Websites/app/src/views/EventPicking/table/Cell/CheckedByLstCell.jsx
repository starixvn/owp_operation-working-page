import React from 'react';
import PropTypes from 'prop-types';
import store from '../../app/store';
import { Input } from 'reactstrap';
import updateConfirmedThunk from '../updateConfirmedThunkNative';

const propTypes = {
  dataSource: PropTypes.array.isRequired,
  rowIndex: PropTypes.number.isRequired
};

const CheckedByLstCell = props => {
  const { rowIndex, dataSource } = props;
  const { confirmed, infoSiteMatchId } = dataSource[rowIndex];
  const { permission } = store.getState().pagePolicy;

  const handleSelectedChanged = async event => {
    const value = event.target.checked;
    await dispatch(
      updateConfirmedThunk({
        confirmed: value,
        infoSiteMatchIds: [infoSiteMatchId]
      })
    );
  };

  return (
    <div className='checked-cell'>
      <Input
        type='checkbox'
        checked={confirmed}
        disabled={!permission.HasWrite}
        onChange={handleSelectedChanged}
      />
    </div>
  );
};

CheckedByLstCell.propTypes = propTypes;
export default CheckedByLstCell;
