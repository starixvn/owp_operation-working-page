import React from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';

const propTypes = {
  dataSource: PropTypes.array.isRequired,
  rowIndex: PropTypes.number.isRequired
};

const RAndDUpdateCell = props => {
  const { rowIndex, dataSource } = props;
  const { rAndDInfos } = dataSource[rowIndex];

  return (
    <div className='r-and-d-update-cell'>
      <div className='r-and-d-update'>
        <ul className='r-and-d-update-list'>
          {rAndDInfos.length > 0
            ? rAndDInfos.map(info => (
                <li
                  key={uniqueId()}
                  style={{
                    backgroundColor: info.bgColor,
                    color: info.textColor,
                    margin: '1px',
                    padding: '1px'
                  }}>
                  {info.rAndDUpdate}
                </li>
              ))
            : null}
        </ul>
      </div>
    </div>
  );
};

RAndDUpdateCell.propTypes = propTypes;
export default RAndDUpdateCell;
