import React from 'react';
import { TCellModel } from '../type/type';

const MatchInfo = (props: TCellModel & { componentId: string }) => {
  const { rowIndex, dataSource, componentId } = props;
  const event = dataSource[rowIndex];
  return (
    <>
      <p className='match-name'>
        {event.home} -vs- {event.away}
      </p>
      {event.noOfHDP && (
        <span className={`badge-label badge-hdp-${event.noOfHDPId}`}>
          {event.noOfHDP}
        </span>
      )}
      {event.matchOffers.map((element, index) => (
        <span
          key={`${componentId}`}
          className={`badge-label ${element.matchOfferValue.includes('OFF VR')
            ? 'off-vr-offer'
            : 'match-offer'
            } `}>
          {element.matchOfferValue}
        </span>
      ))}
      {event.matchCode && <span className='match-code'>{event.matchCode}</span>}
    </>
  );
};

export default MatchInfo;
