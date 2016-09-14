import React, { useRef } from 'react';
import { UncontrolledTooltip } from 'reactstrap';
import PropTypes from 'prop-types';
import { LinkIcon, LinkOffIcon } from 'mdi-react';

const propTypes = {
  dataSource: PropTypes.array.isRequired,
  rowIndex: PropTypes.number.isRequired
};

const StatusCell = props => {
  const { dataSource, rowIndex } = props;
  const { adminsiteMatchId, offerLive, matchNo, isLinked } =
    dataSource[rowIndex];
  const linkRef = useRef();
  const offerRef = useRef();
  if (!offerLive) {
    return null;
  }

  const offerLiveLowerCase = offerLive.toLowerCase();

  const buildOfferLive = offerLiveStatus => {
    switch (offerLiveStatus) {
      case 'postponed':
        return '';
      case 'live':
        return 'LIVE';
      case 'canceled':
        return '';
    }
    return null;
  };

  const renderLinkedMatch = row => {
    const renderIcon = () =>
      isLinked ? (
        <LinkIcon color='#00920A' size={15} />
      ) : (
        <LinkOffIcon color='#FF0000' size={15} />
      );

    return (
      <>
        <span id={`link-tooltip-${row}`} className='link' ref={linkRef}>
          {renderIcon()}
        </span>
        <UncontrolledTooltip placement='right' target={linkRef}>
          AdminSiteId: {adminsiteMatchId}
        </UncontrolledTooltip>
      </>
    );
  };
  return (
    <div className='status-cell'>
      <span>{matchNo}</span>
      {renderLinkedMatch(rowIndex)}
      <span
        id={`offer-live-${rowIndex}`}
        ref={offerRef}
        className={`icon-offer-live icon-${offerLiveLowerCase}`}>
        {buildOfferLive(offerLiveLowerCase)}
      </span>
      <UncontrolledTooltip placement='right' target={offerRef}>
        {offerLive}
      </UncontrolledTooltip>
    </div>
  );
};

StatusCell.propTypes = propTypes;
export default StatusCell;
