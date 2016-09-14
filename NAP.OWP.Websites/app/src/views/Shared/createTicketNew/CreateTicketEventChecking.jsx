import React from 'react';
import CreateTicketBoardEvent from './CreateTicketBoardEvent';
import { urlRequestEvent, urlRequestLeague } from './const/const';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { TICKET_TYPE } from '../TicketCenterPrematch/const/const.json';

const { EVENT_CHECKING } = TICKET_TYPE;
const propTypes = {
  creatorInfo: PropTypes.object.isRequired
};

const CreateTicketEventChecking = props => {
  const { creatorInfo } = props;
  const { isEventChecking, valueEvent } = useSelector(
    state => state.createTicketBoard
  );
  const handleBuildModel = () => {
    return {
      InfoSiteMatchId: valueEvent.infoSiteMatchId,
      OwpAwayId: valueEvent.awayId,
      OwpHomeId: valueEvent.homeId,
      OwpLeagueId: valueEvent.owpLeagueId,
      url: valueEvent.isLeague ? urlRequestLeague : urlRequestEvent
    };
  };

  return (
    isEventChecking && (
      <CreateTicketBoardEvent
        creatorInfo={creatorInfo}
        handleBuildModel={handleBuildModel}
        ticketType={EVENT_CHECKING}
      />
    )
  );
};

CreateTicketEventChecking.propTypes = propTypes;
export default CreateTicketEventChecking;
