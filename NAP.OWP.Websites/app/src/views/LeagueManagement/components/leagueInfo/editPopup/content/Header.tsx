import React from 'react';
import Select from 'react-select-ts';
import { useAppSelector } from '../../app/hooks';
import { TOption, TProps } from '../EditType';

const Header: React.FC<TProps> = ({ data, updateSetting }) => {
  const { league, leagueGroup, leagueGroupId } = data;
  const { leagueGroupOptions } = useAppSelector(state => state.editSettingSlice);

  const handleChangeLeagueGroup = (selectedOption: TOption | null) => {
    leagueGroupId !== selectedOption?.value && updateSetting('leagueGroupId', selectedOption?.value);
  };

  return (
    <div className='header'>
      <span>{league}</span>
      <Select
        options={leagueGroupOptions}
        defaultValue={leagueGroupOptions.find(x => x.label === leagueGroup)}
        className='basic-multi-select'
        classNamePrefix='select'
        onChange={handleChangeLeagueGroup}
      />
    </div>
  );
};

export default Header;