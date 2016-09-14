import React from 'react';
import store from './app/store';
import { Provider } from 'react-redux';
import NighShiftManagement from './NighShiftManagement';
import { SignalRWrapper } from './ImportPrematchHelperNative';

const AppNightShiftManagement = () => {
  return (
    <Provider store={store}>
      <NighShiftManagement />
      <SignalRWrapper />
    </Provider>
  );
};
export default AppNightShiftManagement;
