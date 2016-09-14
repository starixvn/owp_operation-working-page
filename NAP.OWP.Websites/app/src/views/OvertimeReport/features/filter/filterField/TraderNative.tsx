import React from 'react';
import { Input } from 'reactstrap';

const Trader = React.forwardRef((_: {}, ref: React.Ref<HTMLInputElement | HTMLTextAreaElement> | undefined) => (
  <div className='filter-control'>
    <div className='label'>Trader</div>
    <Input
      innerRef={ref}
      type='text'
      name='league'
      className='input-field'
      defaultValue=''
      placeholder='Username or Nickname'
    />
  </div>
));

Trader.displayName = 'Trader';
export default Trader;
