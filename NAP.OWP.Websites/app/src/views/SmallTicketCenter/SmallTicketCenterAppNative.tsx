import store from './app/storeNative';
import { Provider } from 'react-redux';
import SmallTicketCenterManagementNative from './SmallTicketCenterManagementNative';
import useSignalRWrapper from './features/signalR/useSignalRWrapper';
const SmallTicketCenterAppNative = () => {
  return (
    <Provider store={store}>
      <SmallTicketCenterManagementNative />
      {useSignalRWrapper()}
    </Provider>
  );
};

export default SmallTicketCenterAppNative;
