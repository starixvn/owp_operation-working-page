import React from 'react';
import PropTypes from 'prop-types';
import { PlusCircleIcon } from 'mdi-react';
import { useSelector } from 'react-redux';

const propTypes = {
  handleOpenCreateTicket: PropTypes.func
};
const CreateTicketHandler = props => {
  const { handleOpenCreateTicket } = props;
  const hasWrite = useSelector(state => state.pagePolicy).permission.HasWrite;

  if (!hasWrite) {
    return null;
  }

  return (
    <PlusCircleIcon onClick={handleOpenCreateTicket} className='icon-plus' />
  );
};

CreateTicketHandler.propTypes = propTypes;

export default CreateTicketHandler;
