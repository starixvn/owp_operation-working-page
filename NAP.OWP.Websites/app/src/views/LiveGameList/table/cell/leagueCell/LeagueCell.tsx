import React from 'react';
import { CellProps } from '../../../type/TableType';

const LeagueCell = ({ rowIndex, dataSource }: CellProps): JSX.Element => {
  const { League, MatchOffers, NoOfHDP, NoOfHDPId } = dataSource[rowIndex];

  const renderNoOfHdpInfo = () =>
    NoOfHDP && (
      <span className={`badge-label badge-hdp-${NoOfHDPId}`}>
        {NoOfHDP.trim().replace(' ', '')}
      </span>
    );

  const renderMatchOffer = () =>
    MatchOffers.map(x => (
      <span
        key={`matchOffer-${x.OWPMatchId}-${x.MatchOfferValue}-${rowIndex}`}
        className='badge-label match-offer'>
        {x.MatchOfferValue}
      </span>
    ));

  return (
    <div className='league-cell'>
      <p>{League}</p>
      <p>
        {renderNoOfHdpInfo()}
        {renderMatchOffer()}
      </p>
    </div>
  );
};

export default LeagueCell;
