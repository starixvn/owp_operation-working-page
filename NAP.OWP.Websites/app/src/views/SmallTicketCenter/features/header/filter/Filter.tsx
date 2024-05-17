
import Command from './Command';
import DateRangeFilter from './DateRangeFilter';
import Event from './Event';
import TicketTypeWrapper from './TicketTypeWrapper';

const Filter = () => {
  return (
    <div className='block-filter has-dropdown'>
      <div className='filter-control'>
        <DateRangeFilter />
        <Event/>
        <TicketTypeWrapper/>
        <Command/>
      </div>
    </div>
  );
};

export default Filter;
