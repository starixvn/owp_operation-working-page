import { Switch } from '@mui/material';
import React, { ChangeEvent, useState } from 'react';
import { StatusProps } from '../../typing/type';

const Status = (props: StatusProps) => {
  const { isActive, onChange, key } = props;
  const [value, setValue] = useState(isActive);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setValue(checked);
    onChange && onChange(checked, key);
  };

  return (
    <div className='setting-status'>
      <span className='status'>Active</span>
      <Switch
        data-testid='status-testid'
        color='primary'
        checked={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default Status;
