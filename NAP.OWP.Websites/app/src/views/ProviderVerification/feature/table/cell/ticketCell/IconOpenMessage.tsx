import { useState } from 'react';
import { MessageTextOutlineIcon } from 'mdi-react';
import { TTicketCell } from '../../../../type/table';

const IconOpenMessage = ({ isRead }: Pick<TTicketCell, 'isRead'>) => {
  const [isOpenTicketList, setIsOpenTicketList] = useState(false);
  const color = isRead ? 'icon-message' : 'icon-unread-message';
  return (
    <>
      <div className='ticket'>
        <span onClick={() => setIsOpenTicketList(true)}>
          <MessageTextOutlineIcon
            className={color}
            color={color}
          />
        </span>
      </div>
      {isOpenTicketList && <></>}
    </>
  );
};

export default IconOpenMessage;
