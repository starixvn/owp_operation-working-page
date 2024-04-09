import store from '../../app/storeNative';
import { setDataSignalR } from '../table/tableSlice';
import { handleReload } from '../../../Shared/ticketEvent/signalR/reLoadHelper';

const reloadTicketCellTable = (parentMatchId: number, actorId: number) => {
  handleReload(store, actorId, parentMatchId, setDataSignalR);
};

export { reloadTicketCellTable };
