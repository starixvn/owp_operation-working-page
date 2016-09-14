import store from '../app/storeNative';
import { setDataSignalR } from '../features/table/taskListSlice';
import { handleReload } from '../../Shared/ticketEvent/signalR/reLoadHelper';

const reloadTicketCellTable = (owpMatchId, actorId) => {
  handleReload(store, actorId, owpMatchId, setDataSignalR);
};

export { reloadTicketCellTable };
