import React from 'react';
import Filter from './filterArea/Filter';
import { OWPPage, OWPHeader, OWPBody } from '../Shared/common/OWP/OPWPage';
import EventPickingTable from './table/EventPickingTable';
import usePermission from '../Shared/customHook/usePermission';
import { FunctionKeys } from '../Shared/Constants';

const EventPickingManagementNative = () => {
  usePermission(FunctionKeys.EventPickingNew, 'pagePolicy');
  return (
    <div className='event-picking'>
      <OWPPage className='event-picking-page'>
        <OWPHeader className='tickets-tab'>
          <Filter />
        </OWPHeader>

        <OWPBody className='tickets-tab'>
          <EventPickingTable />
        </OWPBody>
      </OWPPage>
    </div>
  );
};

export default EventPickingManagementNative;
