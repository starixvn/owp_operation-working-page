import { Provider } from 'react-redux';
import store from './app/storeNative';
import ProviderVerificationAppNative from './ProviderVerificationAppNative';

const ProviderVerificationNative = () => {
  return (
    <Provider store={store} >
      <ProviderVerificationAppNative />
    </Provider>
  );
};

export default ProviderVerificationNative;
