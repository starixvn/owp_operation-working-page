import React from 'react';
import { PesOrFiFa } from '../../type/TTaskListTable';
import { UncontrolledTooltip } from 'reactstrap';

const PesIcon = (props: PesOrFiFa) => {
  const { rowIndex } = props;
  return (
    <>
      <i
        className='icon-match icon-pes'
        original-title='PES'
        id={`link-pes-${rowIndex}`}></i>
      <UncontrolledTooltip placement='bottom' target={`link-pes-${rowIndex}`}>
        PES
      </UncontrolledTooltip>
    </>
  );
};

export default PesIcon;
