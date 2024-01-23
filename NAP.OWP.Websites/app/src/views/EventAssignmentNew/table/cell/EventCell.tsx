import React from 'react';
import { TCellModel, TDataSource } from '../../type/type';
import { PlusIcon, ArrowRightIcon } from 'mdi-react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from 'reactstrap';
import store from '../../app/store';
import Utils from '../../../Shared/Utils';
import MatchInfo from '../../components/MatchInfo';
import EventPopup from '../../../Shared/EventPopup';
import dayjs from 'dayjs';
import { useAppDispatch } from '../../app/hooks';
import { setEventDetailInfo } from '../../newEvent/eventDetailSlice';

const EventCell = (props: TCellModel) => {
  const dispatch = useAppDispatch();
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
    const kickOffTime = `K.O Time: ${event.KickOffTime}`;
    const league = `League: ${event.League}`;
    const match = `Match: ${event.Home} -vs- ${event.Away}`;
    const matchNo = `Match ID: ${event.AdminSiteId ?? ''}`;
    const iptv = `TV/IPTV: ${event.IPTVCopy ?? ''} `;
    const provider = `Provider: ${event.Provider ?? ''}`;

    window.executeCopy(kickOffTime, league, match, matchNo, iptv, provider);
  };

  const allowToAddMinorMatch =
    isAllowAddEvent &&
    FullBetTypes.HasWrite &&
    event.OWPMatchId === event.ParentMatchId &&
    isYesterdayOrAfter;

  const dataLength = dataSource.length;
  const threeLastRow = [dataLength - 1, dataLength - 2, dataLength - 3];
  const className = threeLastRow.some(i => i === rowIndex)
    ? 'last-popup'
    : null;

  return (
    <div className='table-cell' key={`Event${uuidv4()}${rowIndex}`}>
      {event.LeagueGroup && (
        <h4 className='league-group league-badge'>{event.LeagueGroup}</h4>
      )}
      <h4 className='league-group league-name'>{event.League}</h4>

      {allowToAddMinorMatch && (
        <a
          onClick={e => {
            e.preventDefault();
            dispatch(setEventDetailInfo(event));
          }}
          rel='noopener noreferrer'
          className='add-specialEvent'>
          <PlusIcon size={13} />
        </a>
      )}
      {detailInformationPolicy.HasRead && event.IsAllowedToViewDetail && (
        <a
          onClick={e => {
            e.preventDefault();
            // TODO
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

      {event.AdminSiteId && (
        <>
          <Button className='button-link-trader' id={`Event${rowIndex}`}>
            <span className='icon-link'></span>
          </Button>
          <EventPopup
            className={className}
            adminSiteId={event.AdminSiteId}
            isFantasy={event.IsFantasy}
            rowIndex={rowIndex}
            minorBettypeId={event.MinorBettypeId}
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
