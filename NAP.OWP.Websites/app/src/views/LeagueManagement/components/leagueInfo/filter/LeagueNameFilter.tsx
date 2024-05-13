import { useState, KeyboardEvent, useEffect } from 'react';
import { useAppDispatch } from '../app/hooks';
import {
  getLeagueInfoThunk,
  getLeagueSettingByOwpLeagueId
} from '../table/leagueInfoTableSlice/leagueInfoThunk';
import TVListCustom from './TVListCustom';
const LeagueNameFilter = () => {
  const [value, setValue] = useState('');
  const dispatch = useAppDispatch();
  const searchParams = new URLSearchParams(document.location.search);
  const owpLeagueId = searchParams.get('leagueId');
  const parseOwpLeagueId = owpLeagueId ? parseInt(owpLeagueId) : 0;
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    e.key === 'Enter' && handleOnBlur();
  };

  const handleOnBlur = async () => {
    await dispatch(getLeagueInfoThunk(value));
  };

  useEffect(() => {
    const getAllLeague = async () => {
      await dispatch(getLeagueInfoThunk(value));
    };
    const getLeagueSettingById = async () => {
      await dispatch(getLeagueSettingByOwpLeagueId(parseOwpLeagueId));
    };
    owpLeagueId ? getLeagueSettingById() : getAllLeague();
  }, []);

  return (
    <div className='league-filter'>
      <span> League </span>
      <input
        type='text'
        onBlur={handleOnBlur}
        onKeyDown={handleKeyDown}
        value={value}
        onChange={e => setValue(e.target.value)}></input>
    </div>
  );
};

export default LeagueNameFilter;
