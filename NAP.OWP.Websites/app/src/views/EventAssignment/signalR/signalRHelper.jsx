import store from '../app/store';
import { setDataSignalR } from '../reducer/tableReducer';
import { handleReload } from '../../Shared/ticketEvent/signalR/reLoadHelper';

const reloadTicketCellTable = (owpMatchId, actorId) => {
  handleReload(store, actorId, owpMatchId, setDataSignalR);
};

export { reloadTicketCellTable };
