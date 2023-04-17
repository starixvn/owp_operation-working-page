import React from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';

class KOTimeCell extends React.PureComponent {
  render() {
    const { data, rowIndex } = this.props;
    const { OtherTime, KickOffTime, InfoSiteTimeDisplay } = data[rowIndex];
    const conditionToShowInfoSiteTime =
      !isEqual(KickOffTime, InfoSiteTimeDisplay) &&
      !isEqual(OtherTime, InfoSiteTimeDisplay);
    return (
      <div className='kickoff-cell'>
        <span className='time-cell'>
          {KickOffTime}
          {OtherTime && (
            <span className='badge-label other-time'>{OtherTime}</span>
          )}
          {conditionToShowInfoSiteTime && (
            <span className='badge-label info-site-time'>
              {InfoSiteTimeDisplay}
            </span>
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
