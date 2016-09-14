import React from 'react';
import PropTypes from 'prop-types';

class KOTimeCell extends React.PureComponent {
  render() {
    const { data, rowIndex } = this.props;
    const { OtherTime } = data[rowIndex];
    return (
      <div className='kickoff-cell'>
        <span className='time-cell'>
          {data[rowIndex].KickOffTime}
          {OtherTime ? (
            <span className='badge-label other-time'>{OtherTime}</span>
          ) : (
            ''
          )}
        </span>
      </div>
    );
  }
}

KOTimeCell.propTypes = {
  data: PropTypes.array.isRequired,
  rowIndex: PropTypes.number.isRequired
};

export default KOTimeCell;
