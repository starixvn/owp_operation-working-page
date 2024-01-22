import React, { useState } from 'react';
import AddEvent from './AddEvent';
import store from '../app/store';
import { useAppSelector } from '../app/hooks';

const NewSpecialEvent = () => {
  const [show, setShow] = useState(false);
  const { policy, filter } = store.getState();
  const { entities: { Odds } } = policy;
  const { filterState: { selectedDate }, filterOptions: { MatchStatus } } = filter;
  const eventDetail = useAppSelector(x => x.eventDetail);

  // TODO
  const onSaved = () => {

  };

  return show
    ? <AddEvent
      oddsPolicy={Odds}
      parentEvent={eventDetail}
      selectedDate={selectedDate}
      matchStatuses={MatchStatus}
      policy={policy}
      onToggleModal={() => setShow(!show)}
      onSaved={onSaved}
    />
    : null;
};


export default NewSpecialEvent;