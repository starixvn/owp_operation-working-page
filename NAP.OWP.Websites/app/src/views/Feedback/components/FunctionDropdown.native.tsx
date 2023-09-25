import React, { useEffect, useState } from 'react';
import { BODY } from '../const.json';
import Select from 'react-select-ts';
import { queryFunction } from '../services.native';

const FunctionDropdown = () => {
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  useEffect(() => {
    (async () => {
      setOptions(await queryFunction());
    }
    )();

  }, []);
  return (
    <div className='choose__function'>
      <p className='title'>{BODY.CHOOSE_FUNCTION}<span className='required'>*</span></p>
      <Select
        data-testId='select'
        options={options}
        value={selected}
        onChange={setSelected}
        className='basic-filter-select'
      />
    </div>
  );
};

export default FunctionDropdown;
