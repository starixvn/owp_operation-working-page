import { updateFilterState } from './filterSlice';
import { useAppDispatch } from '../app/hooks';
import SearchEmployee from '../../Shared/SearchEmployee/SearchEmployee';
type UserOption = {
  value: number;
  label: string;
};

const UserSuggestionFilter = () => {
  const dispatch = useAppDispatch();
  const handleSelectedUserIds = (selected: Array<UserOption>) => {
    const value = selected.map(x => x.value).join();
    dispatch(
      updateFilterState({
        key: 'userIds',
        value
      })
    );
  };
  return (
    <div className='filter-control filter-employee'>
      <SearchEmployee onChangeOptions={handleSelectedUserIds} />
    </div>
  );
};
export default UserSuggestionFilter;
