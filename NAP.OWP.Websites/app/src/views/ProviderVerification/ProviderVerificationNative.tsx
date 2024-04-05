import Filter from './feature/filter/Filter';
import { Provider } from 'react-redux';
import store from './app/storeNative';
import Table from './feature/table/Table';
const ProviderVerificationNative = () => {
  return (
    <Provider store={store} >
      <div className='provider-verification'>
        <Filter />
        <Table />
      </div>
    </Provider>
  );
};

export default ProviderVerificationNative;
