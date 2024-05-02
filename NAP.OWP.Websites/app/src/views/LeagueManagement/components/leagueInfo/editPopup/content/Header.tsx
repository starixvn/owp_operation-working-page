import React from 'react';
import Select from 'react-select-ts';
import { useAppSelector } from '../../app/hooks';
import { TProps } from '../EditType';

const Header: React.FC<TProps> = ({ data }) => {
  const { league, leagueGroup } = data;
  const { leagueGroupOptions } = useAppSelector(state => state.editSettingSlice);

  const handleChangeLeagueGroup = () => { };

  return (
    <div className='header'>
      <span>{league}</span>
      <Select
        options={leagueGroupOptions}
        defaultValue={leagueGroupOptions.find(x => x.label === leagueGroup)}
        className='basic-multi-select'
        classNamePrefix='select'
        name='leagueGroup'
      //onChange={handleChangeLeagueGroup}
      />
    </div>
  );
};

export default Header;