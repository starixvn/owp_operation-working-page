import FilterTicketCenter from './filter/FilterTicketCenter';
import { MARKET, STATUS } from '../../const/const.json';

const Header = () => {
  const defaultValue = {
    MarketKey: MARKET[0].value,
    TicketStatuses: STATUS[0].value
  };

  return (
    <div className='block-filter has-dropdown'>
      <div className='filter-control '>
        <FilterTicketCenter defaultValue={defaultValue} />
      </div>
    </div>
  );
};

export default Header;
