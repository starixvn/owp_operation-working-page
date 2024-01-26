import { useSelector } from 'react-redux';

import TicketDetail from './TicketDetail';

const TicketDetailBoard = () => {
  const { isOpenPopup } = useSelector(state => state.chatBoard);
  return <>{isOpenPopup && <TicketDetail policy='pagePolicy' />}</>;
};

export default TicketDetailBoard;
