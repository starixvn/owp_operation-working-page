import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import ViewCreateTicketBoard from './ViewCreateTicketBoard';
const propTypes = {
  creatorInfo: PropTypes.any
};
const CreateTicketPlusCircle = props => {
  const { creatorInfo } = props;
  const { isOpenTicket, modelByRowIndex } = useSelector(
    state => state.chatBoard
  );
  const { selectedRecipients, subTypeSelected } = useSelector(
    state => state.createTicketBoard
  );

  return (
    <>
      {isOpenTicket && (
        <ViewCreateTicketBoard
          modelByRowIndex={modelByRowIndex}
          selectedRecipients={selectedRecipients}
          creatorInfo={creatorInfo}
          subTypeSelected={subTypeSelected}
        />
      )}
    </>
  );
};

CreateTicketPlusCircle.propTypes = propTypes;
export default CreateTicketPlusCircle;
