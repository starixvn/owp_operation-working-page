import React from 'react';
import { shallow } from 'zustand/shallow';
import { getLocaleDateTime } from '../../../Shared/DateTime/dateTimeHelper';
import useStore from '../../app/useStore';

const Header = () => {
  const { matchInfo } = useStore(
    state => ({
      matchInfo: state.workScheduleInfo.matchInfo
    }),
    shallow
  );
  const {
    matchNo,
    leagueName,
    homeName,
    awayName,
    koTime,
    maxbetHDPInString,
    bettypeName
  } = matchInfo;
  return (
    <div className='match-info'>
      {matchInfo.leagueName && (
        <>
          <b>
            #{matchNo} {leagueName} | {homeName} -vs- {awayName}
          </b>
          &nbsp;
          <span className='time'>
            Event Date: {getLocaleDateTime(koTime, 'MMM DD, YYYY hh:mm A')}
            <span className='maxbet-string'> {maxbetHDPInString}</span>
          </span>
          &nbsp;
          <span className='bet-type'>{bettypeName}</span>
        </>
      )}
    </div>
  );
};

export default Header;
