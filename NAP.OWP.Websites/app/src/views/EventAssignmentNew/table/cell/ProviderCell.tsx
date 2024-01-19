import React from 'react';
import { TCellModel } from '../../type/type';
import {
  Button,
  UncontrolledPopover,
  PopoverBody
} from 'reactstrap';
import { v4 as uuidv4 } from 'uuid';
import {
  PhoneIcon
} from 'mdi-react';

const ProviderCell = (props: TCellModel) => {
  const { dataSource, rowIndex } = props;
  const { otherProvider, phone, provider } = dataSource[rowIndex];
  const buttonIdOtherProvider = `OtherProvider${rowIndex}`;
  const buttonIdPhone = `Phone${rowIndex}`;
  return (
    <div className='provider-cell'>
      {provider && (
        <p className='runner'>{provider}</p>
      )}
      {otherProvider && (
        <React.Fragment key={`OtherProvider${uuidv4()}${rowIndex}`}>
          <Button id={buttonIdOtherProvider} className='button-provider'>
            Other Provider
          </Button>
          <UncontrolledPopover
            className='channel-popover'
            trigger='legacy'
            placement='right'
            target={buttonIdOtherProvider}>
            <PopoverBody>{otherProvider}</PopoverBody>
          </UncontrolledPopover>
        </React.Fragment>
      )}
      {phone && (
        <React.Fragment key={`Phone${uuidv4()}${rowIndex}`}>
          <Button id={buttonIdPhone} className='button-provider'>
            <PhoneIcon size={11} /> Phone
          </Button>
          <UncontrolledPopover
            className='channel-popover'
            trigger='legacy'
            placement='right'
            target={buttonIdPhone}>
            <PopoverBody>{phone}</PopoverBody>
          </UncontrolledPopover>
        </React.Fragment>
      )}
    </div>
  );
};

export default ProviderCell;