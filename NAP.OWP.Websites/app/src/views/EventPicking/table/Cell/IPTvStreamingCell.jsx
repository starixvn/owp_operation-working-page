import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { UncontrolledTooltip } from 'reactstrap';
import { checkIsShow } from '../../helper/checkShowToolTipHelper';

const propTypes = {
  dataSource: PropTypes.array.isRequired,
  rowIndex: PropTypes.number.isRequired
};

const IPTvStreamingCell = props => {
  const { rowIndex, dataSource } = props;
  const { tV, ipTv, channel, wb } = dataSource[rowIndex];
  const ref = useRef(null);
  const checkShowToolTip = checkIsShow({ tV, ipTv, channel, wb });

  const renderTv = () =>
    tV && (
      <span>
        <strong>Tv: </strong>
        {tV}
      </span>
    );

  const renderIpTv = () =>
    ipTv && (
      <span>
        <strong>IPTV: </strong>
        {ipTv}
      </span>
    );

  const renderChanel = () =>
    channel && (
      <span>
        <strong>Channel: </strong>
        {channel}
      </span>
    );

  const renderWb = () =>
    wb && (
      <span>
        <strong>Streaming Info(WB): </strong>
        {wb}
      </span>
    );

  return (
    <>
      <div className='streaming-info-cell' ref={ref}>
        {renderTv()}
        {renderIpTv()}
        {renderChanel()}
        {renderWb()}
      </div>
      {checkShowToolTip && (
        <UncontrolledTooltip
          className='tooltip-content'
          placement='top-start'
          target={ref}>
          {renderTv()}
          {renderIpTv()}
          {renderChanel()}
          {renderWb()}
        </UncontrolledTooltip>
      )}
    </>
  );
};

IPTvStreamingCell.propTypes = propTypes;
export default IPTvStreamingCell;
