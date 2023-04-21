import React from 'react';
import { TableCell } from '../../TypeNative';
import { MessageIcon } from 'mdi-react';
import { Icon, Tooltip } from '@mui/material';

const ExplainCell = ({ value }: TableCell) => {
  return (
    <div>
      <Tooltip
        title={<span className='explanation'>{value}</span>}
        placement='right-end'>
        <Icon>
          <MessageIcon size={15} className='tool-tip' />
        </Icon>
      </Tooltip>
    </div>
  );
};

export default ExplainCell;
