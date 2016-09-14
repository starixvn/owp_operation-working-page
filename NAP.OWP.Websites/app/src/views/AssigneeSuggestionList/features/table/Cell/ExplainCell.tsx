import React from 'react';
import { TableCell } from '../../TypeNative';
import { MessageIcon } from 'mdi-react';
import { Icon } from '@mui/material';

const ExplainCell = ({ value }: TableCell) => {
  return (
    <div>
      <Icon>
        <MessageIcon size={15} className='tool-tip' />
      </Icon>
    </div>
  );
};

export default ExplainCell;
