import store from '../../app/storeNative';
import { reloadTicketCenterTable } from './signalRHelper';

const handleNewMessageIncome = () => {
  const model = store.getState();
  reloadTicketCenterTable(model);
};

export { handleNewMessageIncome };
