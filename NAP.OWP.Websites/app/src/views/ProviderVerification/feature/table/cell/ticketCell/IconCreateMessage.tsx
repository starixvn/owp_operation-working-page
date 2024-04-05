import { PlusCircleIcon } from 'mdi-react';
import { useAppSelector, useAppDispatch } from '../../../../app/hookNative';


const IconCreateMessage = () => {

  const dispatch = useAppDispatch();

  // TODO
  const handleOpenCreateTicket = () => {

  };


  return (
    <span onClick={handleOpenCreateTicket}>
      <PlusCircleIcon
        className='icon-plus'
      />
    </span>
  );
};

export default IconCreateMessage;
