import React from 'react';
import AddEvent from './AddEvent';
import store from '../app/store';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setEventDetailInfo } from './eventDetailSlice';
import { TDataSource } from '../type/type';

const NewSpecialEvent = () => {
  const dispatch = useAppDispatch();
  const { policy, filter } = store.getState();
  const { entities: { Odds } } = policy;
  const { filterState: { selectedDate }, filterOptions: { MatchStatus } } = filter;
  const { event } = useAppSelector(x => x.eventDetail);

  return event.OWPMatchId
    ? <AddEvent
      oddsPolicy={Odds}
      parentEvent={event}
      selectedDate={selectedDate}
      matchStatuses={MatchStatus}
      policy={policy}
      onToggleModal={() => dispatch(setEventDetailInfo({} as TDataSource))}
      onSaved={() => dispatch(setEventDetailInfo({} as TDataSource))}
    />
    : null;
};


export default NewSpecialEvent;