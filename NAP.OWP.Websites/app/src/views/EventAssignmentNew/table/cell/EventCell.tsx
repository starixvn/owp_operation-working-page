import React from 'react';
import { TCellModel } from '../../type/type';
import { PlusIcon, ArrowRightIcon } from 'mdi-react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from 'reactstrap';
import store from '../../app/store';
import Utils from '../../../Shared/Utils';
import MatchInfo from '../../components/MatchInfo';

const EventCell = (props: TCellModel) => {
  const { filter:
    {
      entities: {
        selectedDate
      }
    },
    policy: {
      entities: {
        FullBetTypes,
        detailInformationPolicy
      }
    }
  } = store.getState();
  const { rowIndex, dataSource } = props;
  const event = dataSource[rowIndex];
  const isYesterdayOrAfter = Utils.isYesterdayOrAfterForAssignment(selectedDate);

  const handleCopy = () => {
    const kickOffTime = `K.O Time: ${event.kickOffTime}`;
    const league = `League: ${event.league}`;
    const match = `Match: ${event.home} -vs- ${event.away}`;
    const matchNo = `Match ID: ${event.adminSiteId ?? ''}`;
    const iptv = `TV/IPTV: ${event.iPTVCopy ?? ''} `;
    const provider = `Provider: ${event.provider ?? ''}`;

    window.executeCopy(kickOffTime, league, match, matchNo, iptv, provider);
  };

  // TODO
  //isAllowAddEvent
  const allowToAddMinorMatch =
    true &&
    FullBetTypes.HasWrite &&
    event.oWPMatchId === event.parentMatchId &&
    isYesterdayOrAfter;
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

      <MatchInfo dataSource={dataSource} rowIndex={rowIndex} componentId={uuidv4()} />

      {event.AdminSiteId > 0 && (
        <>
          <Button className='button-link-trader' id={`Event${rowIndex}`}>
            <span className='icon-link'></span>
          </Button>
          {/* <EventPopup
            className={className}
            adminSiteId={event.AdminSiteId}
            isFantasy={event.IsFantasy}
            rowIndex={rowIndex}
            minorBettypeId={event.MinorBettypeId}
          /> */}
        </>
      )}
      <Button className='btn-copy-content' onClick={handleCopy}>
        <span className='icon-content_copy'></span>
      </Button>
    </div>
  );
};

export default EventCell;