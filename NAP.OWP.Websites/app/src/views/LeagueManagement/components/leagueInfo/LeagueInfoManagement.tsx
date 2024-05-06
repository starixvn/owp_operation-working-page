import { Provider } from 'react-redux';
import LeagueNameFilter from './filter/LeagueNameFilter';
import LeagueInfoTable from './table/LeagueInfoTable';
import store from './app/storeNative';

const LeagueInfoManagement = () => {
  return (
    <Provider store={store}>
      <LeagueNameFilter />
      <LeagueInfoTable />
    </Provider>
  );
};
export default LeagueInfoManagement;
