import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfoIcon from '../../../assets/svg-element/InfoIcon';
import store, { RootState } from '../app/store';
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
import ExportNative from './ExportNative';
import UserGuideWrapper from '../userGuide/UserGuideWrapper';
import TurnoverMargin from './TurnoverMargin';
import { REQUEST_STATUS } from '../../Shared/Constants';
import Loading from '../../components/Loading';

const Filter = () => {
  const dispatch = useDispatch();
  const { date } = useSelector((state: RootState) => state.filter.param);
  const queryLeagueStatus = useSelector((state: RootState) => state.filter.queryLeagueStatus);


  const { turnOverMarginPolicy: {
    permission: { HasRead }
  } } = store.getState();

  useEffect(() => {
    dispatch(getLeagues(Utils.formatDate(date)));
  }, [date, dispatch]);

  useEffect(() => {
    dispatch(getUpdateTypes());
  }, [dispatch]);

  if (queryLeagueStatus === REQUEST_STATUS.pending) {
    return <Loading />;
  }
  return (
    <div className='filter-control'>
      <DateTimePicker />
      <League />
      <SelectGame />
      <FilterMatch />
      <HasProvider />
      <HasOtherProvider />
      <MatchCategory />
      {HasRead && <TurnoverMargin />}
      <UpdateType />
      <Command />
      <ExportNative />
      <InfoIcon />
      <UserGuideWrapper />
    </div>
  );
};
export default Filter;
