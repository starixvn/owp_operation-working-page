import store from '../app/storeNative';
import { setDataSignalR } from '../table/tableSlice/tableSlice';
import { handleReload } from '../../Shared/ticketEvent/signalR/reLoadHelper';

const reloadTicketCellTable = (owpMatchId, actorId) => {
  handleReload(store, actorId, owpMatchId, setDataSignalR);
};

export { reloadTicketCellTable };
