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
  const renderCell = () => {
    return (
      <div className='r-and-d-update-cell'>
        <div className='r-and-d-update'>
          <ul className='r-and-d-update-list'>
            {rAndDInfos.map(info => (
              <li
                key={uniqueId()}
                style={{
                  backgroundColor: info.bgColor,
                  color: info.textColor,
                  margin: '2px',
                  padding: '2px'
                }}>
                {info.rAndDUpdate}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return rAndDInfos.length && renderCell();
};

RAndDUpdateCell.propTypes = propTypes;
export default RAndDUpdateCell;
