import { useState, useCallback } from 'react';
import update from 'immutability-helper';
import { useStableDispatch } from '../../../ImportTicketCenterHelperNative';
import PropTypes from 'prop-types';
import { STATUS } from '../../../const/const.json';
import { MultiSelect } from 'react-multi-select-component';
import DateRangeFilter from './DateRangeFilter';
import { Option } from '../../../../Shared/MultipleSelection/type';
import { useAppDispatch } from '../../../app/hooksNative';
import Event from './Event';
import TicketTypeWrapper from './TicketTypeWrapper';


const FilterTicketCenter = () => {
  

  const defaultStatus = STATUS.filter(
    x => x.value === defaultValue.TicketStatuses
  );
  const [filter, setFilter] = useState({});
  const [selectedStatuses, setSelectedStatuses] = useState(defaultStatus);
  
  const stableDispatch = useStableDispatch();

  const handleSubmit = useCallback(() => {
    // TODO
    /* const { ticketTypeId } = filter;

    if (!TicketTypeId) {
      ToastrWrapper.showError(
        'Please select at least one option for Ticket Type or Subtype'
      );
      return;
    }

    stableDispatch(getEventTickets(filter));
    stableDispatch(onSubmitFilterModel(filter)); */
  }, [filter, stableDispatch]);

  const updateFilter = (key: ('fromDate' | 'toDate') | string, value: Date | string | number) => {
    const newFilter = update(filter, {
      [key]: {
        $set: value
      }
    });
    setFilter(newFilter);
  };



  const handleSelectStatuses = (selectStatus: Array<Option>) => {
    setSelectedStatuses(selectStatus);
    const statusesInString = selectStatus.map(s => s.value).join(',');
    updateFilter('ticketStatuses', statusesInString);
  };

  return (
    <>
      <DateRangeFilter />
      <Event/>
      <TicketTypeWrapper/>
      <div className='multi-select-dropdown'>
        <div className='label'>Status</div>
        <MultiSelect
          className='status'
          options={STATUS}
          value={selectedStatuses}
          disableSearch
          ClearSelectedIcon={null}
          onChange={handleSelectStatuses}
          labelledBy=''
        />
      </div>
      <button className='button-submit' onClick={handleSubmit}>
        Search
      </button>
    </>
  );
};

export default FilterTicketCenter;
