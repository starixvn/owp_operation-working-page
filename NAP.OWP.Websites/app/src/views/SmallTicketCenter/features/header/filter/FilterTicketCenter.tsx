import { useEffect, useState, useCallback } from 'react';
import update from 'immutability-helper';
import { useStableDispatch } from '../../../ImportTicketCenterHelperNative';
import PropTypes from 'prop-types';
import ToastrWrapper from '../../../../components/ToastrWrapper';
import { STATUS } from '../../../const/const.json';
import TicketTypeFilter from './TicketTypeFilter';
import { buildTicketTypeFilter, getDefaultDateRange } from '../../../Helper/TicketCenterHelper';
import Loading from '../../../../components/Loading';
import { MultiSelect } from 'react-multi-select-component';
import DateRangeFilter from './DateRangeFilter';
import Utils from '../../../../Shared/Utils';
import { Option } from '../../../../Shared/MultipleSelection/type';
import { getTicketTypeOption } from '../../../services/service';

const propTypes = {
  defaultValue: PropTypes.object.isRequired
};

const FilterTicketCenter = props => {
  const { defaultValue } = props;
  const { fromDateDefault, toDateDefault } = getDefaultDateRange();
  const defaultStatus = STATUS.filter(
    x => x.value === defaultValue.TicketStatuses
  );
  const [filter, setFilter] = useState({});
  const [ticketTypeOption, setTicketTypeOption] = useState([]);
  const [defaultOption, setDefaultOption] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState(defaultStatus);
  const [loading, setLoading] = useState(true);
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

  const handleOnChange = (select, key) => {
    const { value } = select;
    updateFilter(key, value);
  };

  const handleSelectTicketType = value => {
    const ticketTypeInString = value.join(',');
    updateFilter('ticketTypeId', ticketTypeInString);
  };

  const handleSelectStatuses = (selectStatus: Array<Option>) => {
    setSelectedStatuses(selectStatus);
    const statusesInString = selectStatus.map(s => s.value).join(',');
    updateFilter('ticketStatuses', statusesInString);
  };

  useEffect(() => {
    (async () => {
      const { parents, children } = await getTicketTypeOption();
      const { parentOption, childrenOption, emptyOption } =
        buildTicketTypeFilter(parents, children);
      const initTicketTypeValue = [...childrenOption, ...emptyOption].map(
        i => i.value
      );
      setDefaultOption(initTicketTypeValue);
      defaultValue.TicketTypeId = initTicketTypeValue.join(',');
      defaultValue.FromDateFilter = Utils.formatDate(fromDateDefault);
      defaultValue.ToDateFilter = Utils.formatDate(toDateDefault);
      setFilter({ ...defaultValue });

      setTicketTypeOption([...parentOption, ...childrenOption, ...emptyOption]);

      setLoading(false);
    })();
  }, [stableDispatch, defaultValue]);



  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <DateRangeFilter onUpdate={updateFilter} />
      <div className='search-text'>
        <div className='label'>Event</div>
        <input
          className='input-text-event'
          placeholder='League/Match/Subject'
          defaultValue={filter.event}
          onChange={e => handleOnChange(e.target, 'event')}
        />
      </div>
      <div className='ticket-type-dropdown'>
        <div className='show-by-filter-control'>
          <div className='label'>Ticket Type - Subtype</div>
          <TicketTypeFilter
            defaultValue={defaultOption}
            options={ticketTypeOption}
            onSelectedChange={select => handleSelectTicketType(select)}
          />
        </div>
      </div>
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

FilterTicketCenter.propTypes = propTypes;
export default FilterTicketCenter;
