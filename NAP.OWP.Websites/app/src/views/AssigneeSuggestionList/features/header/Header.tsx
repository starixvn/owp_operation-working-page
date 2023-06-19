import React from 'react';
import { shallow } from 'zustand/shallow';
import { getLocaleDateTime } from '../../../Shared/DateTime/dateTimeHelper';
import useStore from '../../app/useStoreNative';
import SearchAssignee from './SearchAssignee';
import ColorExplain from './ColorExplain';

const Header = () => {
  const {
    workScheduleInfo: { matchInfo }
  } = useStore(
    state => ({
      workScheduleInfo: state.workScheduleInfo
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
    <>
      <div className='match-info'>
        {leagueName && (
          <>
            <b>
              #{matchNo} {leagueName} | {homeName} -vs- {awayName}
            </b>
            &nbsp;
            <span className='time'>
              Event Date: {getLocaleDateTime(koTime, 'MMM DD, YYYY hh:mm A')}
              &nbsp; <span className='maxbet-string'> {maxbetHDPInString}</span>
            </span>
            &nbsp;
            <span className='bet-type'>{bettypeName}</span>
          </>
        )}
      </div>
      <SearchAssignee />
      <ColorExplain />
    </>
  );
};

export default Header;
