import React from 'react';
import { Provider } from 'react-redux';
import store from './app/store';
import EventAssignment from './EventAssignment';

const EventPickingAppNative = () => {

  return (
    <Provider store={store}>
      <EventAssignment />
    </Provider>
  );
};
export default EventPickingAppNative;
