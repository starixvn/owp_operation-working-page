import React, { useLayoutEffect, useRef } from 'react';
import { shallow } from 'zustand/shallow';
import useStore from '../../app/useStore';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import { numberElement } from './../../const/Const.json';

const SuggestionTable = () => {
  const tableRef = useRef<HTMLDivElement>(null);
  const { workScheduleInfo } = useStore(
    state => ({
      workScheduleInfo: state.workScheduleInfo
    }),
    shallow
  );

  useLayoutEffect(() => {
    if (tableRef.current) {
      const element = tableRef.current;
      const currentTimeElement = element.querySelector('.current-timeline');
      const freezeElement = element.querySelector('.working-scheduler-header');
      if (
        currentTimeElement instanceof HTMLElement &&
        freezeElement instanceof HTMLElement
      ) {
        element.scrollLeft =
          currentTimeElement?.offsetLeft -
          freezeElement?.offsetWidth -
          currentTimeElement?.offsetWidth * numberElement;
      }
    }
  }, []);

  return (
    <div>
      <div ref={tableRef} className='table-content'>
        <table>
          <thead>
            <TableHeader
              filterDate={workScheduleInfo.matchInfo.filterDate}
              eventDate={workScheduleInfo.matchInfo.koTime}></TableHeader>
          </thead>
          <tbody>
            <TableBody
              workingShifts={workScheduleInfo.workingSchedules}></TableBody>
          </tbody>
        </table>
      </div>
      <span className='total-record'>
        Total records: {workScheduleInfo.workingSchedules.length}
      </span>
    </div>
  );
};

export default SuggestionTable;
