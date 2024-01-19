import React from 'react';
import { TCellModel } from '../../type/type';
import { Button, UncontrolledPopover, PopoverBody } from 'reactstrap';
import { v4 as uuidv4 } from 'uuid';
import { PhoneIcon } from 'mdi-react';

const ProviderCell = (props: TCellModel) => {
  const { dataSource, rowIndex } = props;
  const { OtherProvider, Phone, Provider } = dataSource[rowIndex];
  const buttonIdOtherProvider = `OtherProvider${rowIndex}`;
  const buttonIdPhone = `Phone${rowIndex}`;
  return (
    <div className='provider-cell'>
      {Provider && <p className='runner'>{Provider}</p>}
      {OtherProvider && (
        <React.Fragment key={`OtherProvider${uuidv4()}${rowIndex}`}>
          <Button id={buttonIdOtherProvider} className='button-provider'>
            Other Provider
          </Button>
          <UncontrolledPopover
            className='channel-popover'
            trigger='legacy'
            placement='right'
            target={buttonIdOtherProvider}>
            <PopoverBody>{OtherProvider}</PopoverBody>
          </UncontrolledPopover>
        </React.Fragment>
      )}
      {Phone && (
        <React.Fragment key={`Phone${uuidv4()}${rowIndex}`}>
          <Button id={buttonIdPhone} className='button-provider'>
            <PhoneIcon size={11} /> Phone
          </Button>
          <UncontrolledPopover
            className='channel-popover'
            trigger='legacy'
            placement='right'
            target={buttonIdPhone}>
            <PopoverBody>{Phone}</PopoverBody>
          </UncontrolledPopover>
        </React.Fragment>
      )}
    </div>
  );
};

export default ProviderCell;
