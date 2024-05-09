import Select from 'react-select-ts';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { TOption, TProps } from '../EditType';
import { updateObject } from '../slice/editSettingSlice';
import React from 'react';

const Header: React.FC<TProps> = ({ data }) => {
  const leagueGroupOptions = useAppSelector(state => state.editSettingSlice.leagueGroupOptions);
  const { leagueGroupId, league } = data;
  const dispatch = useAppDispatch();

  const handleChangeLeagueGroup = (selectedOption: TOption | null) => {
    const newValue = selectedOption?.value || 0;
    if (leagueGroupId !== newValue) {
      dispatch(updateObject({ inputKey: 'leagueGroupId', newValue }));
      dispatch(updateObject({ inputKey: 'leagueGroup', newValue: selectedOption?.label || '' }));
    }
  };

  return (
    <div className='header'>
      <span>{league}</span>
      <Select
        options={leagueGroupOptions}
        defaultValue={leagueGroupOptions.find(x => x.value === leagueGroupId)}
        className='basic-multi-select'
        classNamePrefix='select'
        onChange={handleChangeLeagueGroup}
      />
    </div>
  );
};

export default Header;