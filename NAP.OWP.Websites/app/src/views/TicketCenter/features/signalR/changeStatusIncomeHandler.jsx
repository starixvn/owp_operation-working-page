import store from '../../app/storeNative';
import { reloadTicketCenterTable } from './signalRHelper';

const changeStatusIncomeHandler = () => {
  const model = store.getState();
  reloadTicketCenterTable(model);
};

export default changeStatusIncomeHandler;
