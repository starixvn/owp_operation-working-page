import store from './app/storeNative';
import { Provider } from 'react-redux';
import SmallTicketCenterManagementNative from './SmallTicketCenterManagementNative';

const SmallTicketCenterAppNative = () => {
  return (
    <Provider store={store}>
      <SmallTicketCenterManagementNative />
    </Provider>
  );
};

export default SmallTicketCenterAppNative;
