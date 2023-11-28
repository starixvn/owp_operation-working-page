import React from 'react';
import { Provider } from 'react-redux';
import TicketDetailLayout from './TicketDetailLayout';
import '../../scss/components/_chatboard.scss';
import useSignalRWrapper from './SignalR/SignalRWrapper';
import store from './store';

const TicketLayoutWrapper = () => {
  return (
    <Provider store={store}>
      <TicketDetailLayout />
      {useSignalRWrapper()}
    </Provider>
  );
};
export default TicketLayoutWrapper;
