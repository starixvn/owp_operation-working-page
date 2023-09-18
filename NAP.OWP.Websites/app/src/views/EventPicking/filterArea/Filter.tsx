import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfoIcon from '../../../assets/svg-element/InfoIcon';
import { RootState } from '../app/store';
import Command from './Command';
import DateTimePicker from './DateTimePicker';
import FilterMatch from './FilterMatch';
import MatchCategory from './FilterMatchCategory';
import HasOtherProvider from './HasOtherProvider';
import HasProvider from './HasProvider';
import League from './League';
import SelectGame from './SelectGame';
import UpdateType from './UpdateType';
import { getLeagues, getUpdateTypes } from './slice/filterThunkNative';
import Utils from '../../Shared/Utils';

const Filter = () => {
  const dispatch = useDispatch();
  const { date } = useSelector((state: RootState) => state.filter.param);
  useEffect(() => {
    dispatch(getLeagues(Utils.formatDate(date)));
  }, [date, dispatch]);

  useEffect(() => {
    dispatch(getUpdateTypes());
  }, [dispatch]);

  return (
    <div className='filter-control'>
      <DateTimePicker />
      <League />
      <SelectGame />
      <FilterMatch />
      <HasProvider />
      <HasOtherProvider />
      <MatchCategory />
      <UpdateType />
      <Command />
      <InfoIcon />
    </div>
  );
};
export default Filter;
