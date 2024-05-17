import Utils from "../../../../Shared/Utils";
import ToastrWrapper from "../../../../components/ToastrWrapper";
import { useAppDispatch } from "../../../app/hooksNative";
import store from "../../../app/storeNative";
import { getEventTickets } from "../../table/slice/ticketSliceThunkNative";

const Command = () => {
  const dispatch= useAppDispatch();
  const handleSubmit=(event: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
    event.preventDefault();
    const {actorId,
      marketKey,
      fromDateFilter,
      toDateFilter,
      keyword,
      ticketTypeId,
      ticketStatuses}= store.getState().filter.entities.filterInfo;
  
    if (!ticketTypeId) {
      ToastrWrapper.showError(
        'Please select at least one option for Ticket Type or Subtype'
      );
      return;
    }

    if (!ticketStatuses) {
      ToastrWrapper.showError('Please select at least one option for Status');
      return;
    }

    dispatch(getEventTickets({actorId: 8,
      marketKey,
      fromDateFilter: Utils.formatDate(fromDateFilter),
      toDateFilter: Utils.formatDate(toDateFilter),
      keyword,
      ticketTypeId,
      ticketStatuses}));
  };

  return (
    <button className='button-submit' onClick={handleSubmit}>
    Search
  </button>
  );
};

export default Command;