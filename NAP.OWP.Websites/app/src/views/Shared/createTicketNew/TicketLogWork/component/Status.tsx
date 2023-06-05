import React from 'react';
import Select from 'react-select-ts';

type Props = {
  options: StatusOption[];
  selected: StatusOption;
  handleOnChange: (select: StatusOption | null) => void;
};

const Status = ({ options, selected, handleOnChange }: Props) => {
  return (
    <div className='form-createTicket'>
      <label>
        Status:<span className='required'>*</span>
      </label>
      <br />
      <div className='select'>
        <Select options={options} value={selected} onChange={handleOnChange} />
      </div>
    </div>
  );
};

export default Status;
