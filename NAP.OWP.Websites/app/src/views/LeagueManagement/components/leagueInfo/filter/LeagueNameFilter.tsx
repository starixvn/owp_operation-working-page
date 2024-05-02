import { useState, KeyboardEvent } from 'react';
import { useAppDispatch } from '../app/hooks';
import { getLeagueInfoThunk } from '../table/slice/LeagueInfoThunk';

const LeagueNameFilter = () => {
  const [value, setValue] = useState('');
  const dispatch = useAppDispatch();

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    e.key === 'Enter' && handleOnBlur();
  };

  const handleOnBlur = async () => {
    const league = value;
    await dispatch(getLeagueInfoThunk(league));
  };

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
