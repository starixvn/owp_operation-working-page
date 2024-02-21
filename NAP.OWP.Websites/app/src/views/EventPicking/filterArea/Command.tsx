import { getEventPickings } from '../table/eventPickingTableSlice/eventSliceThunkNative';
import store from '../app/store';
import useStableDispatch from '../../Shared/customHook/useStableDispatch';
const Command = () => {
  const dispatch = useStableDispatch();

  const handleSearch = () => {
    const { param } = store.getState().filter;
    dispatch(getEventPickings(param));
  };

  return (
    <button className='button-submit' onClick={handleSearch}>
      Search
    </button>
  );
};

export default Command;
