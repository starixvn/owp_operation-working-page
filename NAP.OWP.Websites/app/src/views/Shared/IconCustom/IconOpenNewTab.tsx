import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useSelector } from 'react-redux';
import { openNewChattingTab } from '../Utils';

type Props = {
  ticketId: number;
  eventType: number;
};

const IconOpenNewTab = ({ ticketId, eventType }: Props) => {
  const actorId = useSelector(state => state?.pagePolicy?.permission?.ActorId);
  return (
    <span
      onClick={() => openNewChattingTab(actorId, ticketId, eventType)}
      className='icon-new-tab'>
      <OpenInNewIcon className='icon-new-tab'></OpenInNewIcon>
    </span>
  );
};

export default IconOpenNewTab;
