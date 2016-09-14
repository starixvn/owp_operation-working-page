import React from 'react';
import { formatTime } from '../DateTime/dateTimeHelper';
import PropTypes from 'prop-types';

const TicketDetailHeader = ({
  ticketId = '',
  subject = '',
  homeName = '',
  awayName = '',
  owpLeagueName = '',
  koTime = ''
}) => {
  if (subject) {
    return <h3 className='text-bold h3'>#{`${ticketId} - ${subject}`}</h3>;
  }

  if (homeName) {
    const kickOffTime = formatTime(koTime, 'minute', 'h:mm A');
    const evenDate = formatTime(koTime, 'minute', 'MMM DD, YYYY');
    return (
      <>
        <h3 className='text-bold'>#{`${ticketId} - ${owpLeagueName}`}</h3>
        <div className='event-title'>
          <span className='text-bold h3'>
            {' '}
            {homeName} -vs- {awayName}
          </span>
          <span className='event-date'>
            <span>{`(${evenDate}`}</span>
            <span>{`- ${kickOffTime})`}</span>
          </span>
        </div>
      </>
    );
  }

  if (owpLeagueName) {
    return <h3 className='text-bold'>#{`${ticketId} - ${owpLeagueName}`}</h3>;
  }

  return (
    <h3 className='text-bold'>
      #{`${ticketId} - This event has been deleted`}
    </h3>
  );
};

TicketDetailHeader.propTypes = {
  ticketId: PropTypes.number.isRequired,
  subject: PropTypes.string.isRequired,
  homeName: PropTypes.string.isRequired,
  awayName: PropTypes.string.isRequired,
  owpLeagueName: PropTypes.string.isRequired,
  koTime: PropTypes.instanceOf(Date).isRequired
};

export default TicketDetailHeader;
