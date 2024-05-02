import { useState, KeyboardEvent, useEffect } from 'react';
import { useAppDispatch } from '../app/hooks';
import { getLeagueInfoThunk } from '../table/leagueInfoTableSlice/leagueInfoThunk';

const LeagueNameFilter = () => {
  const [value, setValue] = useState('');
  const dispatch = useAppDispatch();

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
    getAllLeague();
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
