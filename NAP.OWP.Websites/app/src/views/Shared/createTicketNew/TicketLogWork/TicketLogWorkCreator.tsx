import React from 'react';
import LogWorkPopup from './LogWorkPopup';
import { useSelector } from 'react-redux';
import { LogWorkProps } from './Type';

const TicketLogWorkCreator = (props: LogWorkProps) => {
  const { isOpenLogWork } = useSelector(
    (state: any) => state.createTicketBoard
  );

  return isOpenLogWork && <LogWorkPopup creatorInfo={props.creatorInfo} />;
};

export default TicketLogWorkCreator;
