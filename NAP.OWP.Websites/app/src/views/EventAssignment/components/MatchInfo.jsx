import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  event: PropTypes.object
};

const MatchInfo = ({ event }) => {
  return (
    <>
      <p className='match-name'>
        {event.Home} -vs- {event.Away}
      </p>
      {event.NoOfHDP && (
        <span className={`badge-label badge-hdp-${event.NoOfHDPId}`}>
          {event.NoOfHDP}
        </span>
      )}
      {event.MatchOffers.map((element, index) => (
        <span key={`${uuidv4()}${index}`} className='badge-label match-offer'>
          {element.MatchOfferValue}
        </span>
      ))}
      {event.MatchCode && <span className='match-code'>{event.MatchCode}</span>}
    </>
  );
};

MatchInfo.propTypes = propTypes;
export default MatchInfo;
