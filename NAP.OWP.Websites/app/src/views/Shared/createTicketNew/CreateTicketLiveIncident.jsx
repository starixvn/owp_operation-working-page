import React from 'react';
import CreateTicketBoardEvent from './CreateTicketBoardEvent';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { urlRequestLiveIncident } from './const/const';
import { TICKET_TYPE } from '../TicketCenterPrematch/const/const.json';

const { LIVE_INCIDENT } = TICKET_TYPE;
const propTypes = {
  creatorInfo: PropTypes.object.isRequired
};

const CreateTicketLiveIncident = props => {
  const { creatorInfo } = props;
  const { isLiveIncident, valueEvent } = useSelector(
    state => state.createTicketBoard
  );
  const handleBuildModel = () => {
    return {
      OwpMatchId: valueEvent.owpMatchId,
      OwpLeagueName: valueEvent.leagueName,
      OwpHomeName: valueEvent.homeName,
      OwpAwayName: valueEvent.awayName,
      url: urlRequestLiveIncident
    };
  };

  return (
    isLiveIncident && (
      <CreateTicketBoardEvent
        creatorInfo={creatorInfo}
        handleBuildModel={handleBuildModel}
        ticketType={LIVE_INCIDENT}
      />
    )
  );
};

CreateTicketLiveIncident.propTypes = propTypes;
export default CreateTicketLiveIncident;
