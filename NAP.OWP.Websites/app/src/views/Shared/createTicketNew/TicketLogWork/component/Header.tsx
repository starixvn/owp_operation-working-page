import React from 'react';

type Props = {
  ticketHeader: string;
};

const Header = ({ ticketHeader }: Props) => {
  return (
    <>
      <span className='close-chat-board-popup' />
      <div className='header-popup'>
        <h1> Type: {ticketHeader}</h1>
      </div>
    </>
  );
};

export default Header;
