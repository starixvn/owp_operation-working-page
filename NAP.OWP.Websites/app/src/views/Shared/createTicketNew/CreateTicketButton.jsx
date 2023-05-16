import React from 'react';
import useStableDispatch from '../customHook/useStableDispatch';
import {
  openPopupEventChecking,
  openPopupLiveIncident,
  openPopupOthers,
  getSelectedRecipients,
  changeErrorInput,
  changeErrorOther,
  changeErrorRecipient,
  selectedEvent,
  setTypeTicketText
} from './createTicketBoardSliceNew';
import { closePopup } from '../chatBoardNew/chatBoardSlice';
import { BUTTON_TYPE } from './const/const';
import PropTypes from 'prop-types';

const { LIVE_GAME, PRE_MATCH, MY_TICKET } = BUTTON_TYPE;

const propTypes = {
  buttonType: PropTypes.string
};

const CreateTicketButton = props => {
  const { buttonType } = props;
  const isShowEventCheckingButton =
    buttonType === MY_TICKET || buttonType === PRE_MATCH;
  const isShowLiveIncidentButton =
    buttonType === MY_TICKET || buttonType === LIVE_GAME;

  const dispatch = useStableDispatch();

  return (
    <div className='btn-block-add-new'>
      <div className='dropdown-list'>
        <button className='button-submit'>Create</button>
        <div className='dropdown-content-ticket'>
          {isShowEventCheckingButton && (
            <li
              className='button-event'
              onClick={() => {
                dispatch(setTypeTicketText('Event Checking'));
                dispatch(closePopup());
                dispatch(openPopupEventChecking());
                dispatch(getSelectedRecipients([]));
                dispatch(changeErrorInput(false));
                dispatch(changeErrorRecipient(false));
              }}>
              Event Checking
            </li>
          )}
          <li
            className='button-others'
            onClick={() => {
              dispatch(setTypeTicketText('Group Chat'));
              dispatch(closePopup());
              dispatch(openPopupOthers());
              dispatch(selectedEvent(null));
              dispatch(getSelectedRecipients([]));
              dispatch(changeErrorOther(false));
              dispatch(changeErrorRecipient(false));
            }}>
            Group Chat
          </li>
          <li
            className='button-support'
            onClick={() => {
              dispatch(setTypeTicketText('Ticket Support'));
              dispatch(closePopup());
              dispatch(openPopupOthers());
              dispatch(selectedEvent(null));
              dispatch(getSelectedRecipients([]));
              dispatch(changeErrorOther(false));
              dispatch(changeErrorRecipient(false));
            }}>
            Ticket Support
          </li>
          {isShowLiveIncidentButton && (
            <li
              className='button-live-incident'
              onClick={() => {
                dispatch(setTypeTicketText('Live Incident'));
                dispatch(closePopup());
                dispatch(openPopupLiveIncident());
                dispatch(getSelectedRecipients([]));
                dispatch(changeErrorInput(false));
                dispatch(changeErrorRecipient(false));
              }}>
              Live Incident
            </li>
          )}
        </div>
      </div>
    </div>
  );
};
CreateTicketButton.propTypes = propTypes;
export default CreateTicketButton;
