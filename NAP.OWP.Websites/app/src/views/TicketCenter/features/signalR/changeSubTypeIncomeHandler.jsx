import store from '../../app/storeNative';
import { reloadTicketCenterTable } from './signalRHelper';

const changeSubTypeIncomeHandler = () => {
  const model = store.getState();
  reloadTicketCenterTable(model);
};

export default changeSubTypeIncomeHandler;
