import { getEventPickings } from '../table/eventPickingTableSlice/eventSliceThunkNative';
import store from '../app/store';
import useStableDispatch from '../../Shared/customHook/useStableDispatch';
const Command = () => {
  const dispatch = useStableDispatch();

  const handleSearch = () => {
    const { filter } = store.getState();
    dispatch(getEventPickings(filter.param));
  };

  return (
    <button className='button-submit' onClick={handleSearch}>
      Search
    </button>
  );
};

export default Command;
