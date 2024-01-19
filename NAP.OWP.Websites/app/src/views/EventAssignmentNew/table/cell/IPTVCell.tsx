import React from 'react';
import { Button, UncontrolledPopover, PopoverBody } from 'reactstrap';

import { v4 as uuidv4 } from 'uuid';
import { TCellModel } from '../../type/type';
import { nanoid } from '@reduxjs/toolkit';
const IPTVCell = (props: TCellModel) => {
  const { dataSource, rowIndex } = props;
  const { Televisions, Channel, WatchBet } = dataSource[rowIndex];
  return (
    <div className='tv-cell'>
      {Televisions.length > 0 && (
        <div>
          {Televisions.map(t => (
            <span key={`${nanoid()}`} style={{ color: t.Color }}>
              {t.TVCode}
            </span>
          )).reduce((prev, curr) => [prev, ', ', curr])}
        </div>
      )}

      {Channel && (
        <React.Fragment key={`Channel${nanoid()}${rowIndex}`}>
          <Button id={`Channel${rowIndex}`} className='button-channel'>
            IPTV/Channel
          </Button>
          <UncontrolledPopover
            className='channel-popover'
            trigger='legacy'
            placement='right'
            target={`Channel${rowIndex}`}>
            <PopoverBody>{Channel}</PopoverBody>
          </UncontrolledPopover>
        </React.Fragment>
      )}
      {WatchBet && (
        <React.Fragment key={`WatchBet${uuidv4()}${rowIndex}`}>
          <Button id={`WatchBet${rowIndex}`} className='button-watchbet'>
            Streaming
          </Button>
          <UncontrolledPopover
            className='watchbet-popover'
            trigger='legacy'
            placement='right'
            target={`WatchBet${rowIndex}`}>
            <PopoverBody>{WatchBet}</PopoverBody>
          </UncontrolledPopover>
        </React.Fragment>
      )}
    </div>
  );
};

export default IPTVCell;
