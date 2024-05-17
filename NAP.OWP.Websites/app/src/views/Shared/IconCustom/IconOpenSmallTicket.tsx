import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { openNewSmallTicket } from '../Utils';

const IconOpenSmallTicket = () => {
  return (
    <span onClick={openNewSmallTicket} className='icon-small-ticket-tab'>
      <OpenInNewIcon className='icon-small-ticket-tab'></OpenInNewIcon>
    </span>
  );
};

export default IconOpenSmallTicket;
