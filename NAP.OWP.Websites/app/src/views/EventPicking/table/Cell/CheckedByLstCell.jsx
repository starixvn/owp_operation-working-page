import React from 'react';
import PropTypes from 'prop-types';
import store from '../../app/store';
import { Input } from 'reactstrap';

const propTypes = {
  dataSource: PropTypes.array.isRequired,
  rowIndex: PropTypes.number.isRequired
};

const CheckedByLstCell = props => {
  const { rowIndex, dataSource } = props;
  const { confirmed } = dataSource[rowIndex];
  const { permission } = store.getState().pagePolicy;

  return (
    <div className='checked-cell'>
      <Input
        type='checkbox'
        checked={confirmed}
        disabled={!permission.HasWrite}
        onChange={() => {}}
      />
    </div>
  );
};

CheckedByLstCell.propTypes = propTypes;
export default CheckedByLstCell;
