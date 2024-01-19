import React from 'react';
import { TCellModel } from '../type/type';

const MatchInfo = (props: TCellModel & { componentId: string }) => {
  const { rowIndex, dataSource, componentId } = props;
  const event = dataSource[rowIndex];
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
        <span
          key={`${componentId}`}
          className={`badge-label ${
            element.MatchOfferValue.includes('OFF VR')
              ? 'off-vr-offer'
              : 'match-offer'
          } `}>
          {element.MatchOfferValue}
        </span>
      ))}
      {event.MatchCode && <span className='match-code'>{event.MatchCode}</span>}
    </>
  );
};

export default MatchInfo;
