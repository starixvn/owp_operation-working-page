import React from 'react';
import { CellProps } from '../../../type/TableType';
import AssignmentComponent from '../../../component/Assignment';
import OtherAssignment from '../../../component/OtherAssignment';

const LaCell = (props: CellProps): JSX.Element => {
  const { rowIndex, dataSource } = props;
  const { Assignment } = dataSource[rowIndex];
  const { LA, LAOthers } = Assignment;

  return (
    <div className='la-cell'>
      {LA.length > 0 && <AssignmentComponent assignment={LA} />}
      {LAOthers.length > 0 && <OtherAssignment assignment={LAOthers} />}
    </div>
  );
};

export default LaCell;
