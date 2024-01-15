import React from 'react';
import { UserSuggestion } from '../../components/Assignment/UserSuggestion';
import { updateFilterState } from './filterSlice';
import { useAppDispatch } from '../app/hooks';
const UserSuggestionFilter = () => {
  const dispatch = useAppDispatch();
  const handleSetUserInfo = (
    userNameValue: string,
    userNameIsValidValue: boolean
  ) => {
    const modelUserNameValue = {
      key: 'userNameFilter',
      value: userNameValue
    };
    dispatch(updateFilterState(modelUserNameValue));
    const modelUserNameIsValid = {
      key: 'userNameFilterIsValid',
      value: userNameIsValidValue
    };
    dispatch(updateFilterState(modelUserNameIsValid));
  };
  return (
    <div className='filter-control'>
      <div className='label'>Employee</div>
      <UserSuggestion
        onHandleChange={(userName: string, userNameIsValid: boolean) =>
          handleSetUserInfo(userName, userNameIsValid)
        }
      />
    </div>
  );
};
export default UserSuggestionFilter;
