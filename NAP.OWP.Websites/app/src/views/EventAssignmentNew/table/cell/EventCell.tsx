import React from 'react';
import { TCellModel } from '../../type/type';
import { PlusIcon, ArrowRightIcon } from 'mdi-react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from 'reactstrap';
import store from '../../app/store';
import Utils from '../../../Shared/Utils';
import MatchInfo from '../../components/MatchInfo';
import EventPopup from '../../../Shared/EventPopup';
import dayjs from 'dayjs';

const EventCell = (props: TCellModel) => {
  const {
    filter: {
      filterState: { selectedDate }
    },
    policy: {
      entities: { FullBetTypes, detailInformationPolicy }
    }
  } = store.getState();
  const { rowIndex, dataSource } = props;
  const event = dataSource[rowIndex];
  const isYesterdayOrAfter =
    Utils.isYesterdayOrAfterForAssignment(selectedDate);
  const today = new Date();
  const yesterDay = dayjs(today).subtract(1, 'day');
  const isAllowAddEvent = Utils.isSameOrAfter(selectedDate, yesterDay);

  const handleCopy = () => {
    const kickOffTime = `K.O Time: ${event.kickOffTime}`;
    const league = `League: ${event.league}`;
    const match = `Match: ${event.home} -vs- ${event.away}`;
    const matchNo = `Match ID: ${event.adminSiteId ?? ''}`;
    const iptv = `TV/IPTV: ${event.iPTVCopy ?? ''} `;
    const provider = `Provider: ${event.provider ?? ''}`;

    window.executeCopy(kickOffTime, league, match, matchNo, iptv, provider);
  };

  const allowToAddMinorMatch =
    isAllowAddEvent &&
    FullBetTypes.HasWrite &&
    event.oWPMatchId === event.parentMatchId &&
    isYesterdayOrAfter;

  const dataLength = dataSource.length;
  const threeLastRow = [dataLength - 1, dataLength - 2, dataLength - 3];
  const className = threeLastRow.some(i => i === rowIndex)
    ? 'last-popup'
    : null;

  return (
    <div className='table-cell' key={`Event${uuidv4()}${rowIndex}`}>
      {event.leagueGroup && (
        <h4 className='league-group league-badge'>{event.leagueGroup}</h4>
      )}
      <h4 className='league-group league-name'>{event.league}</h4>

      {allowToAddMinorMatch && (
        <a
          onClick={e => {
            e.preventDefault();
            //addSpecialEvent(event);
          }}
          rel='noopener noreferrer'
          className='add-specialEvent'>
          <PlusIcon size={13} />
        </a>
      )}
      {detailInformationPolicy.HasRead && event.isAllowedToViewDetail && (
        <a
          onClick={e => {
            e.preventDefault();
            //openDetailInformation(event.OWPMatchId);
          }}
          className='link-livedetail'>
          <ArrowRightIcon size={13} />
        </a>
      )}

      <MatchInfo
        dataSource={dataSource}
        rowIndex={rowIndex}
        componentId={uuidv4()}
      />

      {event.adminSiteId && (
        <>
          <Button className='button-link-trader' id={`Event${rowIndex}`}>
            <span className='icon-link'></span>
          </Button>
          <EventPopup
            className={className}
            adminSiteId={event.AdminSiteId}
            isFantasy={event.isFantasy}
            rowIndex={rowIndex}
            minorBettypeId={event.minorBettypeId}
          />
        </>
      )}
      <Button className='btn-copy-content' onClick={handleCopy}>
        <span className='icon-content_copy'></span>
      </Button>
    </div>
  );
};

export default EventCell;
