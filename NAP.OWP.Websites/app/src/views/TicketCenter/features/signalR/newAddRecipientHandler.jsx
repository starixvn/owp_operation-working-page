import store from '../../app/storeNative';
import { reloadTicketCenterTable } from './signalRHelper';

const handleNewAddRecipient = () => {
  const model = store.getState();
  reloadTicketCenterTable(model);
};
export { handleNewAddRecipient };
