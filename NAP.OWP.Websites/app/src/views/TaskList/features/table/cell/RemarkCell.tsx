import React from 'react';
import { CellProps } from '../../../type/TTaskListTable';

const RemarkCell = (props: CellProps) => {
  const { Remark, Round, Division } = props.dataSource;
  const separator = (Remark || Division) && ',';
  return (
    <>
      <div className='js-content-remark'>
        {Remark && <p>{Remark}</p>}
        {Round && (
          <p>
            <b>Round</b>: {Round}
            {separator}{' '}
          </p>
        )}
        {Division && (
          <p>
            <b>Division</b>: {Division}
          </p>
        )}
      </div>
    </>
  );
};

export default RemarkCell;
