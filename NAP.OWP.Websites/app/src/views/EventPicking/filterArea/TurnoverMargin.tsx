import React from 'react';
import { SELECT_TURNOVER_OPTIONS, TURNOVER_MARGIN } from './filterConst.json';
import SingleSelection from '../../Shared/SingleSelection/SingleSelection';
import { TurnoverMarginSelection } from '../types/filterType';
import useStableDispatch from '../../Shared/customHook/useStableDispatch';
import { setFilter } from './slice/filterSlice';
import Utils from '../../Shared/Utils';

const TurnoverMargin = () => {
  const dispatch = useStableDispatch();

  const handleOnChange = (event: TurnoverMarginSelection) => {
    const curDate = new Date();
    const dateByFilter = new Date(
      curDate.setDate(curDate.getDate() - event.value)
    );
    dispatch(
      setFilter({
        key: TURNOVER_MARGIN,
        value: Utils.formatDate(dateByFilter)
      })
    );
  };

  return (
    <div className='multi-select-dropdown'>
      <div className='label'>Turnover & Margin Period</div>
      <SingleSelection
        option={SELECT_TURNOVER_OPTIONS}
        onSelectedChange={handleOnChange}
      />
    </div>
  );
};

export default TurnoverMargin;
